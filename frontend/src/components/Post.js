import React, { useState, useEffect } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
// import logo from '../images/icon-left-font-cut.jpg'

const Post = () => {
  const [posts, setPosts] = useState([])

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const tokenUser = JSON.parse(rawPayload)

  const getPosts = async () => {
    const response = await fetch('http://localhost:5050/posts', {
      headers: { Authorization: 'Bearer ' + token },
    })
    const posts = await response.json()
    setPosts(posts)
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

            const deletePost = async (e) => {
              e.preventDefault()
              axios({
                method: 'DELETE',
                url: `http://localhost:5050/posts/${id}`,
                headers: { Authorization: 'Bearer ' + token },
              }).then(() => getPosts())
            }

            return (
              <li key={id}>
                <div className='headerPost'>
                  <h4>
                    par {userId} le {createdAt}
                  </h4>
                  {userId === tokenUser.userId && (
                    <BsFillTrashFill
                      className='trashIcon'
                      onClick={deletePost}
                    />
                  )}
                </div>
                <p>{content}</p>
                {imageUrl && <img src={imageUrl} alt='' />}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Post
