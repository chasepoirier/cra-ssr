// defaults
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { About, Home, NotFound, Blog } from './views'
import Navbar from './components/Navbar'

const App = () => (
  <div className="App">
    <Navbar />
    <div className="page-wrapper">
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
