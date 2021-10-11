const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config')

router.post('/', auth, postCtrl.createPost)
// router.put('/:id', auth, multer, postCtrl.updatePost)
// router.delete('/:id', auth, postCtrl.deletePost)
// router.get('/', auth, postCtrl.getAllPosts)
// router.get('/:id', auth, postCtrl.getOnePost)
// router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router
