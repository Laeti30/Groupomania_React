import React, { useState } from 'react'
import logo from '../images/icon-left-font-cut.jpg'

const Post = () => {
  const [postTitle, setPostTitle] = useState('Premier post')
  const [postAuthor, setPostAuthor] = useState('Laetitia Dudu')
  const [postData, setPostData] = useState("Il fait beau aujourd'hui")
  const [postImage, setPostImage] = useState(logo)

  return (
    <>
      <article className='postCard'>
        <h4>{postTitle}</h4>
        <h5>Publié par {postAuthor}</h5>
        <p>{postData}</p>
        <img src={postImage} alt='' />
      </article>
    </>
  )
}

export default Post
