// defaults
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { About, Home, NotFound } from './views'
import Navbar from './components/Navbar'

const App = () => (
  <div className="App">
    <div className="page-wrapper">
      <Navbar />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
