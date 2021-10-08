import React from 'react'
import logo from '../images/icon-left-font-cut.jpg'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <>
      <section className='container'>
        <Link to='/'>
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <article className='form'>
          <form>
            <h2>Inscription</h2>
            <div className='form-control'>
              <label htmlFor='lastName'>Nom de famille :</label>
              <input type='text' id='lastName' name='lastName' />
            </div>
            <div className='form-control'>
              <label htmlFor='firstName'>Prénom :</label>
              <input type='text' id='firstName' name='firstName' />
            </div>
            <div className='form-control'>
              <label htmlFor='email'>Email :</label>
              <input type='email' id='email' name='email' />
            </div>
            <div className='form-control'>
              <label htmlFor='password'>Mot de passe :</label>
              <input type='password' id='password' name='password' />
            </div>
            <button type='submit' className='btn'>
              S'inscrire
            </button>
          </form>
          <p>
            Vous avez déjà un compte ?
            <Link to='/login'>
              <span className='signupLink'>Se connecter</span>
            </Link>
          </p>
        </article>
      </section>
    </>
  )
}

export default Signup
