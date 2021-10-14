import React from 'react'
import logo from '../images/icon-left-font-cut.jpg'
import { Link, useHistory } from 'react-router-dom'

const NavBar = () => {
  const history = useHistory()

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
            <Link to='/profile/:id'>
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
