import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { useParams, useHistory } from 'react-router'
import { BsFillTrashFill } from 'react-icons/bs'
import { ImBubbles3 } from 'react-icons/im'
import { HiHeart } from 'react-icons/hi'
import axios from 'axios'

const Post = () => {
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState()
  const { id } = useParams()
  const arrayPost = []
  const arrayComments = []
  let history = useHistory()

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const tokenUser = JSON.parse(rawPayload)

  const getPost = async () => {
    const response = await fetch(`http://localhost:5050/posts/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    const post = await response.json()
    arrayPost.push(post)
    setPost(arrayPost)
  }

  const getComments = async () => {
    const response = await fetch(`http://localhost:5050/posts/${id}/comment`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    const comments = await response.json()
    arrayComments.push(comments)
    setComments(arrayComments)
  }

  useEffect(() => {
    getPost()
    getComments()
  }, [])

  return (
    <>
      <NavBar />
      <section className='postContainer'>
        {post.map((postData) => {
          const { id, content, imageUrl, createdAt, user, userId } = postData

          const deletePost = async (e) => {
            e.preventDefault()
            axios({
              method: 'DELETE',
              url: `http://localhost:5050/posts/${id}`,
              headers: { Authorization: 'Bearer ' + token },
            }).then(() => history.push('/dashboard'))
          }

          return (
            <div key={id} className='postCard'>
              <div className='headerPost'>
                <h4>
                  par{' '}
                  {user.lastName + ' ' + user.firstName + ' le ' + createdAt}
                </h4>
                {userId === tokenUser.userId && (
                  <BsFillTrashFill
                    size={20}
                    className='trashIcon'
                    onClick={deletePost}
                  />
                )}
              </div>
              <p>{content}</p>
              {imageUrl && <img src={imageUrl} alt='' />}
              <div className='commentBox'>
                <form>
                  <input
                    type='text'
                    placeholder='Tapez votre commentaire...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type='submit'>Publier</button>
                </form>
                {comments.map((dataComment) => {
                  const { id, content, userId } = dataComment

                  return (
                    <div key={id}>
                      <h5>{userId}</h5>
                      <p>{content}</p>
                    </div>
                  )
                })}
              </div>
              <div className='postInteract'>
                <ImBubbles3 size={28} className='commentIcon' />
                <HiHeart size={28} className='heartIcon' />
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Post
