const express = require('express')
const router = express.Router()
const MessageController = require('./../controllers/message')
const auth = require('../middleware/auth')

router.post('/',auth, MessageController.list)
router.post('/create',auth, MessageController.create)
router.patch('/update/:id',auth, MessageController.update)
router.delete('/delete/:id',auth, MessageController.delete)

module.exports = router
