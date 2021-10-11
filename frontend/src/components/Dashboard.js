import React, { useState } from 'react'
import NavBar from './NavBar'
import Post from './Post'

const Dashboard = () => {
  const [myPost, setMyPost] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <NavBar />
      <section className='dashboard'>
        <form className='postInputBox'>
          <label htmlFor='myPost'>Publier quelque chose :</label>
          <input
            type='textarea'
            id='myPost'
            name='myPost'
            value={myPost}
            onChange={(e) => setMyPost(e.target.value)}
          />
          <button type='submit' className='btn'>
            Publier
          </button>
        </form>
        <div className='postList'>
          <h3>Dernières publications</h3>
          <Post />
        </div>
        {/* <form onSubmit={handleSubmit} className='form'>
          <div className='form-control'>
            <label htmlFor='myPost'>Publier quelque chose :</label>
            <input
              type='textarea'
              id='myPost'
              name='myPost'
              value={myPost}
              onChange={(e) => setMyPost(e.target.value)}
            />
          </div>
          <button type='submit' className='btn'>
            Publier
          </button>
        </form> */}
      </section>
    </>
  )
}

export default Dashboard
