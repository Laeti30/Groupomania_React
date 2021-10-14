const db = require('../models')
const User = db.users
const bcrypt = require('bcrypt')
const emailValidator = require('email-validator')
const jwt = require('jsonwebtoken')

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (emailValidator.validate(req.body.email)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          // Récupération du password crypté
          password: hash,
        }
        // Sauevagrde du nouvel utilisateur en bdd
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
  // Récupération du user avec son email
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' })
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
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
              expiresIn: '24h',
            }),
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
      res
        .status(400)
        .json({
          message:
            "Impossible de récupérer les données de l'utilisateur " + error,
        })
    )
}
