import React from 'react'
import logo from '../images/icon-left-font-cut.jpg'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
            <li>Déconnexion</li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default NavBar
