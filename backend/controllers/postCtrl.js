const db = require('../models')
const User = db.users
const Post = db.posts

// Créer une nouvelle publication
exports.createPost = (req, res, next) => {
  // const post = { ...req.body, userId: req.body.userId }
  const post = { ...req.body }
  // console.log(post)
  Post.create(post)
    .then(() => res.status(201).json({ message: 'Post créé' }))
    .catch((error) =>
      res.status(400).json({ message: 'Impossible de créer le post' + error })
    )
}

// Supprimer une publication
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(200).json({ message: 'La publication a été supprimée' })
    )
    .catch((error) =>
      res
        .status(400)
        .json({
          message:
            'Un problème est survenu lors de la suppression du post' + error,
        })
    )
}
