const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const userController = require('./../controllers/user')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/account',auth, userController.show )
router.patch('/update/:id',auth, userController.update )

module.exports = router
