// The basics
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

// Action creators and helpers
import { establishCurrentUser } from '../modules/auth'
import { isServer } from '../store'

import Header from './header'
import Routes from './routes'

import './app.css'

const App = ({ isAuthenticated, location }) => (
  <div id="app">
    <Header isAuthenticated={isAuthenticated} current={location.pathname} />
    <div id="content">
      <Routes />
    </div>
  </div>
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser }, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
