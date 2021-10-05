const express = require('express')
const router = express.Router()
const postController = require('./../controllers/test')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/',multer,postController.createPost)
router.put('/:id',multer,postController.updatePostId)
router.delete('/:id',postController.deletePostId)
router.get('/:id',postController.getPostId)
router.get('/',postController.getAllPost)

module.exports = router