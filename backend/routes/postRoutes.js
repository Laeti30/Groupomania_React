const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const multer = require('../middleware/multerConfig')

router.post('/', auth, multer, postCtrl.createPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.get('/', auth, postCtrl.getAllPosts)
router.get('/:userId', auth, postCtrl.getPostsFromUser)
// router.put('/:id', auth, multer, postCtrl.updatePost)
// router.get('/:id', auth, postCtrl.getOnePost)
// router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router
