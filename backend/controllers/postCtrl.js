const db = require('../models')
const User = db.users
const Post = db.posts
const Like = db.likes
const fs = require('fs')
const { Op } = require('sequelize')

// Créer une publication
exports.createPost = (req, res, next) => {
  const post = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
        like: 0,
      }
    : { ...req.body, like: 0 }
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
  Post.findAll({ include: User })
    .then((posts) => res.status(200).json(posts))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible d'afficher les publications" + error })
    )
}

// Récupérer une seule publication
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }, include: User })
    .then((post) => res.status(200).json(post))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible d'afficher la publication" + error })
    )
}

// Liker une publication
exports.likePost = (req, res, next) => {
  Like.findOne({
    where: { userId: req.body.userId, postId: req.body.postId },
  }).then((response) => {
    if (!response) {
      Like.create({ ...req.body })
      // .then(() => res.status(200).json({ message: 'Like enregistré' }))
      // .then(() => console.log('Like envoyé'))
      Post.increment({ like: 1 }, { where: { id: req.body.postId } })
      // .then(() => res.status(200).json({ message: 'Compteur de likes incrémenté' }))
      res
        .status(200)
        .json({ message: 'Like enregistré et compteur incrémenté' })
    } else {
      Like.destroy({
        where: {
          [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }],
        },
      })
      // .then(() => res.status(200).json({ message: 'Like supprimé' }))
      // .then(() => console.log('Like supprimé'))
      Post.decrement({ like: 1 }, { where: { id: req.body.postId } })
      // .then(() => res.status(200).json({ message: 'Compteur de like décrémenté' }))
      res.status(200).json({ message: 'Like supprimé et compteur décrémenté' })
    }
  })
}

// Compter les likes
exports.countLike = (req, res, next) => {
  Like.count({ where: { postId: req.params.id } })
    .then((count) => res.status(200).json(count))
    .catch((error) =>
      res
        .status(400)
        .json({ message: 'Impossible de compter les likes' + error })
    )
}

// Récupérer toutes les publications pour un user en particulier
// exports.getPostsFromUser = (req, res, next) => {
//   Post.findAll({ where: { userId: req.params.userId } })
//     .then((posts) => res.status(200).json(posts))
//     .catch((error) =>
//       res.status(400).json({
//         message:
//           "Impossible d'afficher les publications de cet utilisateur" + error,
//       })
//     )
// }
