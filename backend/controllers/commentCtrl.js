const db = require('../models')
const User = db.users
const Post = db.posts
const Comment = db.comments

// Créer un commentaire
exports.createComment = (req, res, next) => {
  const comment = { ...req.body }
  Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Commentaire créé' }))
    .catch((error) =>
      res
        .status(400)
        .json({ message: 'Impossible de créer le commentaire' + error })
    )
}

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(200).json({ message: 'Le commentaire a été supprimé' })
    )
    .catch((error) =>
      res.status(400).json({
        message:
          'Un problème est survenu lors de la suppression du commentaire' +
          error,
      })
    )
}

// Récupérer tous les commentaires
exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible d'afficher les commentaires" + error })
    )
}
