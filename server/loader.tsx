// Express requirements
import path from 'path'
import fs from 'fs'

// React requirements
import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { Frontload, frontloadServerRender } from 'react-frontload'
import Loadable from 'react-loadable'

// Our store, entrypoint, and manifest
import createStore from '../dist_client/modules/store'
import App from '../dist_client/App'
import { fetchAllPostsSuccess } from '../dist_client/modules/ducks/posts/operations'
import api from '../dist_client/modules/api'
import manifest from '../build/asset-manifest.json'

interface Props {
  html: any
  title: any
  meta: any
  body: any
  scripts: any
  state: any
}

// LOADER
export default (req: any, res: any) => {
  /*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
  */
  const injectHTML = (
    data: any,
    { html, title, meta, body, scripts, state }: Props
  ) => {
    data = data.replace('<html>', `<html ${html}>`)
    data = data.replace(/<title>.*?<\/title>/g, title)
    data = data.replace('</head>', `${meta}</head>`)
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
    )
    data = data.replace('</body>', scripts.join('') + '</body>')

    return data
  }

  // Load in our HTML file from our build
  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    async (err, htmlData) => {
      // If there's an error... serve up something nasty
      if (err) {
        console.error('Read error', err)

        return res.status(404).end()
      }

      // Create a store (with a memory history) from our current url
      let store: any
      if (createStore && api && fetchAllPostsSuccess) {
        store = createStore(req.url).store

        // ASYNC REDUX ACTIONS CAN GO HERE
        const posts = await api.wp.getAllPosts()
        store.dispatch(fetchAllPostsSuccess(posts))
      }

      const context: any = {}
      const modules: any = []
      /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests

        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */

      let ConvertedApp: any = App
      frontloadServerRender(() =>
        renderToString(
          <Loadable.Capture report={(m: any) => modules.push(m)}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <Frontload isServer={true}>
                  <ConvertedApp />
                </Frontload>
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        )
      ).then((routeMarkup: any) => {
        if (context.url) {
          // If context has a url property, then we need to handle a redirection in Redux Router
          res.writeHead(302, {
            Location: context.url
          })

          res.end()
        } else {
          // Otherwise, we carry on...

          // Let's give ourself a function to load all our page-specific JS assets for code splitting
          const extractAssets = (assets: any, chunks: any) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k])

          // Let's format those assets into pretty <script> tags
          const extraChunks = extractAssets(manifest, modules).map(
            c =>
              `<script type="text/javascript" src="/${c.replace(
                /^\//,
                ''
              )}"></script>`
          )

          // We need to tell Helmet to compute the right meta tags, title, and such
          const helmet = Helmet.renderStatic()

          // Pass all this nonsense into our HTML formatting function above
          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraChunks,
            state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
          })

          // We have all the final HTML, let's send it to the user already!
          res.send(html)
        }
      })
    }
  )
}
