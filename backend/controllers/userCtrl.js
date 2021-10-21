const db = require('../models')
const User = db.users
const bcrypt = require('bcrypt')
const emailValidator = require('email-validator')
const emailScramble = require('email-scramble')
const jwt = require('jsonwebtoken')
const fs = require('fs')

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (emailValidator.validate(req.body.email)) {
    const encodedEmail = emailScramble.encode(req.body.email)
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: encodedEmail,
          // Récupération du password crypté
          password: hash,
        }
        // Sauvegarde du nouvel utilisateur en bdd
        User.create(user)
          .then(() =>
            res.status(201).json({ message: 'Nouvel utilisateur créé' })
          )
          .catch((error) => res.status(400).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    res.status(400).json({ message: 'Merci de saisir un email valide' })
  }
}

exports.login = (req, res, next) => {
  const encodedEmail = emailScramble.encode(req.body.email)
  // Récupération du user avec son email
  User.findOne({ where: { email: encodedEmail } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: 'Utilisateur non trouvé' })
      }
      // Vérification password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe invalide' })
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.SECRET_KEY,
              {
                expiresIn: '24h',
              }
            ),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// Récupération d'un user
exports.getUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res.status(400).json({
        message:
          "Impossible de récupérer les données de l'utilisateur " + error,
      })
    )
}

// Modification d'un user
exports.updateUser = (req, res, next) => {
  const user = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  User.update(user, { where: { id: req.params.id } })
    .then(() =>
      res
        .status(200)
        .json({ message: 'Les données utilisateurs ont été mises à jour' })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: 'Impossible de mettre à jour le profil' + error })
    )
}

// Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "L'utilisateur'a été supprimé" })
          )
          .catch((error) =>
            res.status(400).json({
              message:
                "Un problème est survenu lors de la suppression de l'utilisateur" +
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
