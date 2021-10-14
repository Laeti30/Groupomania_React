const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

// router.post('/', auth, commentCtrl.createComment)
// router.delete('/:id', auth, commentCtrl.deleteComment)
// router.get('/', auth, commentCtrl.getAllComments)
// router.get('/:id', auth, commentCtrl.getOneComment)

module.exports = router
