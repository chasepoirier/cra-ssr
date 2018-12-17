import * as React from 'react'
import Helmet from 'react-helmet'
import renderHTML from 'react-render-html'
// import { Link } from 'react-router-dom'

import './blog.css'
import { fetchAllPosts } from '../../modules/ducks/posts/operations'
import { ReduxState } from '../../types/redux'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

interface Props {
  posts: ReduxState['posts']['allPosts']
  fetchPosts: () => Promise<void>
}

class Blog extends React.Component<Props> {
  public componentDidMount() {
    const { posts, fetchPosts } = this.props
    if (posts.data.length === 0) {
      fetchPosts()
    }
  }

  public render() {
    return (
      <div className="blog page">
        <Helmet>
          <title>Blog | CRA SSR</title>
        </Helmet>
        <h1>Blog</h1>

        {this.props.posts.data.map((post: WPPost) => (
          <div key={post.id} style={{ maxWidth: '720px' }}>
            <React.Fragment>{renderHTML(post.title.rendered)}</React.Fragment>
            <React.Fragment>{renderHTML(post.content.rendered)}</React.Fragment>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  posts: state.posts.allPosts
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPosts: () => fetchAllPosts()(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
