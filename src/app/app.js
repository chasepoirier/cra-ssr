// The basics
import React from 'react'
import { Switch, Route } from 'react-router'

// Pages
import Home from './views/Home'
import NotFound from './views/404'
import About from './views/About'

// Components
import * as Navbar from './components/Navbar'

const App = () => (
  <div id="app">
    <div className="page-wrapper">
      <Navbar.default />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
