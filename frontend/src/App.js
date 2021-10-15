import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './style.css'
// pages
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/profile/:id'>
          <Profile />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
