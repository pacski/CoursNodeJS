const express = require('express')
const router = express.Router()
const GroupMemberController = require('./../controllers/groupMember')
const auth = require('../middleware/auth')

router.post('/',auth, GroupMemberController.list)
router.post('/join',auth, GroupMemberController.create)
router.post('/quit',auth, GroupMemberController.delete)

module.exports = router
