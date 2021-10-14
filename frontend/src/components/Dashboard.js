import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { BsFillTrashFill } from 'react-icons/bs'
import { ImBubbles3 } from 'react-icons/im'
import { HiHeart } from 'react-icons/hi'
import axios from 'axios'

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [commentDisplay, setCommentDisplay] = useState(false)

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const tokenUser = JSON.parse(rawPayload)
  const userId = tokenUser.userId

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const postChecker = () => {
      const textRegex = /^[\w'\-,.][^_¡÷¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,500}$/i
      if (textRegex.test(content)) {
        return true
      } else {
        alert('Merci de vérifier le contenu de la publication')
        return false
      }
    }

    if (postChecker()) {
      const formData = new FormData()
      formData.append('content', content)
      formData.append('image', file)
      formData.append('userId', userId)

      axios({
        method: 'POST',
        url: 'http://localhost:5050/posts',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        data: formData,
      })
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            console.log('Publication envoyée')
            setContent('')
            setFile('')
            getPosts()
          } else {
            console.log('il y a une erreur')
          }
        })
        .catch((err) => {
          console.log(err)
          console.log('il y a une erreur dans le catch')
        })
    }
  }
  return (
    <>
      <NavBar />
      <section className='dashboard'>
        <form className='postInputBox' onSubmit={handleSubmit}>
          <input
            type='textarea'
            id='content'
            name='content'
            placeholder='La publication du jour est ...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type='file'
            id='file'
            name='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type='submit' className='btnPublish'>
            Publier
          </button>
        </form>
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

              const getComments = async (e) => {
                setCommentDisplay(true)
              }

              const createComment = (e) => {
                e.preventDefault()
                const commentChecker = () => {
                  const textRegex =
                    /^[\w'\-,.][^_¡÷¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,500}$/i
                  if (textRegex.test(comment)) {
                    return true
                  } else {
                    alert('Merci de vérifier le contenu du commentaire')
                    return false
                  }
                }

                if (commentChecker()) {
                  axios({
                    method: 'POST',
                    url: `http://localhost:5050/posts/${id}/comments`,
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                    data: {
                      content: comment,
                      postId: id,
                      userId: userId,
                    },
                  })
                    .then(() => setComment(''))
                    .catch((error) => console.log(error))
                }
              }
              return (
                <li key={id}>
                  <div className='headerPost'>
                    <h4>
                      par {userId} le {createdAt}
                    </h4>
                    {userId === tokenUser.userId && (
                      <BsFillTrashFill
                        size={24}
                        className='trashIcon'
                        onClick={deletePost}
                      />
                    )}
                  </div>
                  <p>{content}</p>
                  {imageUrl && <img src={imageUrl} alt='' />}
                  <div className='postInteract'>
                    <ImBubbles3
                      size={28}
                      className='heartIcon'
                      onClick={getComments}
                    />
                    <HiHeart size={28} className='commentIcon' />
                  </div>
                  {commentDisplay && (
                    <form>
                      <input
                        type='text'
                        placeholder='Tapez votre commentaire...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button type='submit' onClick={createComment}>
                        Publier
                      </button>
                    </form>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Dashboard
