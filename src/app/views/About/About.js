import * as React from 'react'
import './about.css'
import Helmet from 'react-helmet'

class About extends React.Component {
  render() {
    return (
      <div className="about page">
        <Helmet>
          <title>About | CRA SSR</title>
        </Helmet>
        <h1>About Page</h1>
      </div>
    )
  }
}

export default About
