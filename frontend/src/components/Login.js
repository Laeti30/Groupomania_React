import React, { useState } from 'react'
import logo from '../images/icon-left-font-cut.jpg'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

  const loginCheck = (e) => {
    e.preventDefault()
    if (!emailRegex.test(email)) {
      document.querySelector('.errorMsg').innerText =
        'Merci de saisir un email valide'
      document
        .querySelector('.errorMsg')
        .animate(
          [
            { opacity: '0' },
            { opacity: '1' },
            { opacity: '1' },
            { opacity: '0' },
          ],
          { duration: 3000 }
        )
      // alert('Merci de saisir un email valide')
      setEmail('')
      setPassword('')
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5050/users/login',
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            history.push('/dashboard')
          } else {
            console.log('Impossible de vous connecter')
          }
        })
        .catch((err) => {
          console.log(err)
          document.querySelector('.errorMsg').innerText =
            'Impossible de vous connecter'
          document
            .querySelector('.errorMsg')
            .animate(
              [
                { opacity: '0' },
                { opacity: '1' },
                { opacity: '1' },
                { opacity: '0' },
              ],
              { duration: 3000 }
            )
          setEmail('')
          setPassword('')
        })
    }
  }

  return (
    <>
      <section className='container'>
        <Link to='/'>
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <article className='form'>
          <form onSubmit={loginCheck}>
            <h2>Connexion</h2>
            <div className='form-control'>
              <label htmlFor='email'>Email :</label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='password'>Mot de passe :</label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='btn'>
              Se connecter
            </button>
            <p className='errorMsg'></p>
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
