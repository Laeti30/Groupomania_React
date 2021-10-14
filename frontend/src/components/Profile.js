import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { useParams } from 'react-router'

const Profile = () => {
  const [profile, setProfile] = useState([])
  const { id } = useParams()
  const arrayProfile = []

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const tokenUser = JSON.parse(rawPayload)

  const getProfile = async () => {
    const response = await fetch(`http://localhost:5050/users/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    const profile = await response.json()
    arrayProfile.push(profile)
    setProfile(arrayProfile)
    console.log(arrayProfile)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <NavBar />
      <section className='dashboard' id='profile'>
        <h2>Mon profil</h2>
        {profile.map((profil) => {
          const { id, lastName, firstName, imageUrl } = profil

          return (
            <li key={id}>
              <img src={imageUrl} alt='profile picture' />
              <div className='nameBox'>
                <p> Nom de famille : {lastName} </p>
                <p> Prénom: {firstName} </p>
              </div>
            </li>
          )
        })}
      </section>
    </>
  )
}

export default Profile
