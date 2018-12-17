import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory, createMemoryHistory } from 'history'
import rootReducer from '.'

// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export default (url = '/') => {
  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory()

  const enhancers = []

  // Dev tools are helpful
  if (process.env.NODE_ENV === 'development' && !isServer) {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window

    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      enhancers.push(__REDUX_DEVTOOLS_EXTENSION__())
    }
  }

  const middleware = [thunk, routerMiddleware(history)]
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  // Do we have preloaded state available? Great, save it.
  // eslint-disable-next-line
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {}

  // Delete it once we have it stored in a variable
  if (!isServer) {
    // eslint-disable-next-line
    delete window.__PRELOADED_STATE__
  }

  // Create the store
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers
  )

  return {
    store,
    history
  }
}
