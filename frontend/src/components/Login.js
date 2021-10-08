import React from 'react'
import logo from '../images/icon-left-font-cut.jpg'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <section className='container'>
        <Link to='/'>
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <article className='form'>
          <form>
            <h2>Connexion</h2>
            <div className='form-control'>
              <label htmlFor='email'>Email :</label>
              <input type='email' id='email' name='email' />
            </div>
            <div className='form-control'>
              <label htmlFor='password'>Mot de passe :</label>
              <input type='password' id='password' name='password' />
            </div>
            <button type='submit' className='btn'>
              Se connecter
            </button>
          </form>
          <p>
            Vous n'êtes pas encore inscrit ?
            <Link to='/signup'>
              <span className='signupLink'>Créer un compte</span>
            </Link>
          </p>
        </article>
      </section>
    </>
  )
}

export default Login
