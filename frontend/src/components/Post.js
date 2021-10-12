import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import logo from '../images/icon-left-font-cut.jpg'

const Post = () => {
  const [posts, setPosts] = useState([])
  // const [postTitle, setPostTitle] = useState('Premier post')
  // const [postAuthor, setPostAuthor] = useState('Laetitia Dudu')
  // const [postData, setPostData] = useState("Il fait beau aujourd'hui")
  // const [postImage, setPostImage] = useState(logo)

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const user = JSON.parse(rawPayload)

  const getPosts = async () => {
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
      <article className='postCard'>
        <ul>
          {posts.map((post) => {
            const { id, title, content, imageUrl, userId } = post
            return (
              <li key={id}>
                <h3>{title}</h3>
                <h4>Publié par {userId}</h4>
                <p>{content}</p>
                <img src={imageUrl} alt='' />
              </li>
            )
          })}
        </ul>
      </article>
    </>
  )
}

export default Post
