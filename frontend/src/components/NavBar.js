import React from 'react'
import logo from '../images/icon-left-font-cut.jpg'
import { Link, useHistory } from 'react-router-dom'

const NavBar = () => {
  const history = useHistory()
  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const tokenUser = JSON.parse(rawPayload)

  const logout = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <>
      <header>
        <Link to='/'>
          <img src={logo} alt='logo' className='logo_header' />
        </Link>
        <nav>
          <ul>
            <Link to='/dashboard'>
              <li>Ma communauté</li>
            </Link>
            <Link to={`/profile/${tokenUser.userId}`}>
              <li>Mon profil</li>
            </Link>
            <li onClick={logout}>Déconnexion</li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default NavBar
