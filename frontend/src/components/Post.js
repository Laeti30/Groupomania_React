import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import logo from '../images/icon-left-font-cut.jpg'

const Post = () => {
  const [posts, setPosts] = useState([])

  const token = JSON.parse(localStorage.getItem('token'))
  // const tokenParts = token.split('.')
  // const encodedPayload = tokenParts[1]
  // const rawPayload = atob(encodedPayload)
  // const user = JSON.parse(rawPayload)

  const getPosts = async () => {
    // const response = await axios({
    //   method: 'get',
    //   url: 'http://localhost:5050/posts',
    //   headers: { Authorization: 'Bearer ' + token },
    // })
    const response = await fetch('http://localhost:5050/posts', {
      headers: { Authorization: 'Bearer ' + token },
    })
    const posts = await response.json()
    setPosts(posts)
    console.log(posts)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <div className='postContainer'>
        <h3>Dernières publications</h3>
        <ul className='postList'>
          {posts.map((post) => {
            const { id, author, content, imageUrl, createdAt, userId } = post
            return (
              <li key={id}>
                <h4>
                  par {userId} le {createdAt}
                </h4>
                <p>{content}</p>
                <img src={imageUrl} alt='' />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Post
