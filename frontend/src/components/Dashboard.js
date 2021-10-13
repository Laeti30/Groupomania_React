import React from 'react'
import NavBar from './NavBar'
import Post from './Post'
import PostCreation from './PostCreation'

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <section className='dashboard'>
        <PostCreation />
        <Post />
      </section>
    </>
  )
}

export default Dashboard
