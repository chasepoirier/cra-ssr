import PropTypes from 'prop-types'
import * as React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import renderHTML from 'react-render-html'
import { fetchAllPosts } from '../../../modules/ducks/posts/operations'
// import { Link } from 'react-router-dom'

// import './home.css'

class Home extends React.Component {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType(PropTypes.number, PropTypes.string)
      )
    ).isRequired
  }

  componentDidMount() {
    const { fetchPosts, posts } = this.props
    if (posts.data.length === 0) {
      fetchPosts()
    }
  }

  render() {
    const { posts } = this.props
    return (
      <div className="home page">
        <Helmet>
          <title>Home | CRA SSR</title>
        </Helmet>
        <h1>home</h1>
        <React.Fragment>
          {posts.data.map(post => (
            <div>
              <div>{renderHTML(post.title.rendered)}</div>
              <div>{renderHTML(post.content.rendered)}</div>
            </div>
          ))}
        </React.Fragment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => fetchAllPosts()(dispatch)
})

const mapStateToProps = state => ({
  posts: state.posts.allPosts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
