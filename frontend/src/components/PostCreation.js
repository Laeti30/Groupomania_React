import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PostCreation = () => {
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [posts, setPosts] = useState([])

  const token = JSON.parse(localStorage.getItem('token'))
  const tokenParts = token.split('.')
  const encodedPayload = tokenParts[1]
  const rawPayload = atob(encodedPayload)
  const user = JSON.parse(rawPayload)
  const userId = user.userId

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
      const textRegex =
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,500}$/i
      if (textRegex.test(content)) {
        return true
      } else {
        alert('Merci de vérifier le contenu de la publication')
        return false
      }
    }

    if (postChecker()) {
      axios({
        method: 'post',
        url: 'http://localhost:5050/posts',
        headers: { Authorization: 'Bearer ' + token },
        data: {
          content,
          userId,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            console.log('Publication envoyée')
            setContent('')
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
          value={file}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type='submit' className='btnPublish'>
          Publier
        </button>
      </form>
    </>
  )
}

export default PostCreation
