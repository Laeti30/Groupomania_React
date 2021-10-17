const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')
const passwordChecker = require('../middleware/passwordChecker')
const auth = require('../middleware/auth')
const multer = require('../middleware/multerConfig')

router.post('/signup', passwordChecker, userCtrl.signup)
router.post('/login', userCtrl.login)

router.get('/:id', auth, userCtrl.getUser)
router.delete('/:id', auth, userCtrl.deleteUser)
router.put('/:id', auth, multer, userCtrl.updateUser)

module.exports = router
