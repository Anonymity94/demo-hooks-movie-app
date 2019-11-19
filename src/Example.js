import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import App from './components/App'
import AppWithReducer from './components/App2'
import './index.css'

const NoMatch = () => <p>404</p>

function MenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  })

  return (
    <div className={match ? 'active menu' : 'menu'}>
      {match && '> '}
      <Link to={to}>{label}</Link>
    </div>
  )
}

export default function Example() {
  return (
    <Router>
      <div className="breadcrumb">
        <MenuLink activeOnlyWhenExact={true} to="/" label="useState" />
        <MenuLink to="/with-reducer" label="useResucer" />
      </div>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/with-reducer">
          <AppWithReducer />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}
