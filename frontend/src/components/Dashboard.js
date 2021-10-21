import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Icons
import { BsFillTrashFill } from 'react-icons/bs'
import { ImBubbles3, ImPencil } from 'react-icons/im'
import { HiHeart } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [updatePostContent, setUpdatePostContent] = useState(false)
  const [newContent, setNewContent] = useState('')

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
          if (res.status === 201) {
            setContent('')
            setFile('')
            getPosts()
          } else {
            console.log('il y a une erreur')
          }
        })
        .catch((err) => {
          console.log(err)
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
          <h1>Dernières publications</h1>
          <ul className='postList'>
            {posts.map((post) => {
              const { id, content, imageUrl, createdAt, user, like } = post
              const idPost = post.id

              const deletePost = async (e) => {
                e.preventDefault()
                axios({
                  method: 'DELETE',
                  url: `http://localhost:5050/posts/${id}`,
                  headers: { Authorization: 'Bearer ' + token },
                }).then(() => getPosts())
              }

              const updatePost = () => {
                setUpdatePostContent(!updatePostContent)
                setNewContent(content)
              }

              const sendNewPost = () => {
                console.log(newContent)
                axios({
                  method: 'PUT',
                  url: `http://localhost:5050/posts/${id}`,
                  headers: {
                    Authorization: 'Bearer ' + token,
                  },
                  data: { content: newContent },
                })
                  .then(() => {
                    setUpdatePostContent(false)
                    getPosts()
                  })
                  .catch((error) => console.log(error))
              }

              const sendLike = () => {
                axios({
                  method: 'POST',
                  data: {
                    postId: id,
                    userId: userId,
                  },
                  url: `http://localhost:5050/posts/${id}/like`,
                  headers: {
                    Authorization: 'Bearer ' + token,
                  },
                })
                  .then(() => {
                    getPosts()
                  })
                  .catch((error) => console.log(error))
              }

              const createComment = async (e) => {
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
                    data: {
                      content: comment,
                      postId: id,
                      userId: userId,
                    },
                    withCredentiels: true,
                    url: `http://localhost:5050/posts/${id}/comment`,
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                  })
                    .then(() => {
                      setComment('')
                      getComments()
                    })
                    .catch((error) => console.log(error))
                }
              }

              const getComments = async () => {
                const response = await fetch(
                  `http://localhost:5050/posts/${id}/comment`,
                  { headers: { Authorization: 'Bearer ' + token } }
                )
                const comments = await response.json()
                setComments(comments.data)
              }

              return (
                <li key={id}>
                  <div className='headerPost'>
                    <h2 className='postTitle'>
                      par{' '}
                      <Link to={`profile/${user.id}`}>
                        {' '}
                        {user.firstName + ' ' + user.lastName}
                      </Link>{' '}
                      <span id='creationDate'>
                        {new Date(createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </h2>
                    {(user.id === tokenUser.userId || tokenUser.isAdmin) && (
                      <div>
                        <ImPencil
                          size={20}
                          className='updateIcon'
                          onClick={updatePost}
                        />
                        <BsFillTrashFill
                          size={20}
                          className='trashIcon'
                          onClick={deletePost}
                        />
                      </div>
                    )}
                  </div>
                  {!updatePostContent && <p id='postContent'>{content}</p>}
                  {updatePostContent && (
                    <div className='updateContent'>
                      <input
                        type='textarea'
                        id='newContent'
                        name='newContent'
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                      />
                      <FiSend
                        className='sendIcon'
                        size={22}
                        onClick={sendNewPost}
                      ></FiSend>
                    </div>
                  )}
                  {imageUrl && <img src={imageUrl} alt='' />}
                  <div className='postInteract'>
                    <form>
                      <input
                        type='text'
                        placeholder='Tapez votre commentaire...'
                        id='comment'
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <FiSend
                        className='sendIcon'
                        size={22}
                        onClick={createComment}
                      >
                        Envoyer
                      </FiSend>
                    </form>
                    <ImBubbles3
                      size={28}
                      className='commentIcon'
                      onClick={getComments}
                    />
                    <div className='likeBox'>
                      <HiHeart
                        size={28}
                        className='heartIcon'
                        onClick={sendLike}
                      />
                      <span>{like}</span>
                    </div>
                  </div>
                  <div className='commentContainer'>
                    <ul>
                      {comments.map((commentData) => {
                        const { id, content, postId, createdAt, user } =
                          commentData

                        const deleteComment = async (e) => {
                          e.preventDefault()
                          axios({
                            method: 'DELETE',
                            url: `http://localhost:5050/comments/${id}`,
                            headers: {
                              Authorization: 'Bearer ' + token,
                            },
                          }).then(() => getComments())
                        }

                        if (idPost === postId) {
                          return (
                            <li key={id} className='commentBox'>
                              <div className='headerComment'>
                                <h3 className='commentTitle'>
                                  <Link
                                    to={`profile/${user.id}`}
                                    id='profileLink'
                                  >
                                    {user.lastName + ' ' + user.firstName}
                                  </Link>
                                  {', '}
                                  <span id='creationDate'>
                                    {' '}
                                    le{' '}
                                    {new Date(createdAt).toLocaleDateString(
                                      'fr-FR'
                                    )}
                                  </span>
                                  {', '}
                                  dit :
                                </h3>
                                {(user.id === tokenUser.userId ||
                                  tokenUser.isAdmin) && (
                                  <BsFillTrashFill
                                    size={20}
                                    className='trashIcon'
                                    onClick={deleteComment}
                                  />
                                )}
                              </div>
                              <p>{content}</p>
                            </li>
                          )
                        }
                      })}
                    </ul>
                  </div>
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
