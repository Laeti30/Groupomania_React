const db = require('../models')
const User = db.users
const Post = db.posts

// Create a new post
exports.createPost = (req, res, next) => {
  // const post = { ...req.body, userId: req.body.userId }
  const post = {
    author: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  }
  console.log(post)
  Post.create(post)
    .then(() => res.status(201).json({ message: 'Post créé' }))
    .catch((error) =>
      res.status(400).json({ message: 'Impossible de créer le post' + error })
    )
}
