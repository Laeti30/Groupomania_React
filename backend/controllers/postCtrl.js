const db = require('../models')
// const User = db.users
const Post = db.posts
const fs = require('fs')

// Créer une publication
exports.createPost = (req, res, next) => {
  const post = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  Post.create(post)
    .then(() => res.status(201).json({ message: 'Publication créée' }))
    .catch((error) =>
      res
        .status(400)
        .json({ message: 'Impossible de créer la publication' + error })
    )
}

// Supprimer une publication
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: 'La publication a été supprimée' })
          )
          .catch((error) =>
            res.status(400).json({
              message:
                'Un problème est survenu lors de la suppression du post' +
                error,
            })
          )
      })
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: 'il y a une erreur dans le catch du findOne' + error })
    )
}

// Récupérer toutes les publications
exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible d'afficher les publications" + error })
    )
}

// Récupérer toutes les publications pour un user en particulier
exports.getPostsFromUser = (req, res, next) => {
  Post.findAll({ where: { userId: req.params.userId } })
    .then((posts) => res.status(200).json(posts))
    .catch((error) =>
      res.status(400).json({
        message:
          "Impossible d'afficher les publications de cet utilisateur" + error,
      })
    )
}
