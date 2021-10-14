const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')
const passwordChecker = require('../middleware/passwordChecker')
const auth = require('../middleware/multerConfig')

router.post('/signup', passwordChecker, userCtrl.signup)
router.post('/login', userCtrl.login)

router.get('/:id', auth, userCtrl.getUser)

module.exports = router
