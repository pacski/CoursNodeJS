const express = require('express')
const router = express.Router()
const GroupController = require('./../controllers/group')
const auth = require('../middleware/auth')

router.post('/',auth, GroupController.list)
router.post('/own',auth, GroupController.listOwnGroup)
router.post('/create',auth, GroupController.create)
router.patch('/update/:id',auth, GroupController.update)
router.delete('/delete/:id',auth, GroupController.delete)

module.exports = router
