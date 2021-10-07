const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken')

// Register a new user
exports.signup = (req, res, next) => {
  if (emailValidator.validate(req.body.email)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          // Get the hashed password
          password: hash,
        }
        // Save this new user in database
        User.create(user)
          .then(() => res.status(201).json({ message: 'User created' }))
          .catch((error) => res.status(400).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    res.status(400).json({ message: 'Merci de saisir un email valide' }) 
  }
}

exports.login = (req, res, next) => {
  // Get the user with unique email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
      // Check password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Wrong password' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {expiresIn: '24h'}),
            // token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {expiresIn: '24h'}),
          })
        })
        .catch((error) => res.status(500).json({ message: "Message numéro 1" + error }))
    })
    .catch((error) => res.status(500).json({ message: "Message numéro 1" + error }))
}