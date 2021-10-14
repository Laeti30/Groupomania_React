import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'

const Profile = () => {
  const [profile, setProfile] = useState('')

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const tokenUser = JSON.parse(rawPayload)
  const id = tokenUser.userId

  const getProfile = async () => {
    const response = await fetch(`http://localhost:5050/users/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    const profile = await response.json()
    setProfile(profile)
    console.log(profile)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <NavBar />
      <section className='dashboard'>
        <h2>Mon profil</h2>
        {profile.map((profil) => {
          const { id, lastName, firstName, imageUrl } = profil

          return (
            <li key={id}>
              <div className='headerPost'>
                <h4>
                  {lastName} le {firstName}
                </h4>
              </div>
              <img src={imageUrl} alt='{id} + profile picture' />
            </li>
          )
        })}
      </section>
    </>
  )
}

export default Profile
