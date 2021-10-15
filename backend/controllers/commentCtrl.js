const db = require('../models')
const User = db.users
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

// Récupérer tous les commentaires d'un post
exports.getComments = (req, res) => {
  Comment.findAll({ where: { postId: req.params.id }, include: User })
    .then((data) => res.status(201).json({ data }))
    .catch((error) =>
      res
        .status(500)
        .json({ message: 'Impossible de récupérer les commentaires. ' + error })
    )
}

// Supprimer un commentaire
// exports.deleteComment = (req, res, next) => {
//   Comment.destroy({ where: { id: req.params.id } })
//     .then(() =>
//       res.status(200).json({ message: 'Le commentaire a été supprimé' })
//     )
//     .catch((error) =>
//       res.status(400).json({
//         message:
//           'Un problème est survenu lors de la suppression du commentaire' +
//           error,
//       })
//     )
// }
