const bcrypt = require('bcryptjs')
const { request } = require('../app')
const GroupMember = require('../models/groupMember')
const jsontoken = require('jsonwebtoken')
const server = require('../server')

exports.list = (req, res, next) => {
    GroupMember.find({userId: req.body.userId})
        .populate('owner')
        .populate('group')
        .then((messages) => {
            if (messages) {
                res.status(200).json(messages)
            }
    })
}
exports.create = (req, res, next) => {
    const groupObject = req.body
    delete groupObject._id;
    const p = new GroupMember({
        ...groupObject,
    })
    p.save()
        .then(() => res.status(201).json({ message: 'ok' }))
        .catch(error => res.status(400).json({ error}))
}
exports.delete = (req, res, next) => {
       GroupMember.deleteOne({groupId: req.body.groupId, userId: req.body.userId})
        .then( message => {
            res.status(200).json({message: 'ok'})
        })
        .catch(error => res.status(500).json({error:"test"}))  
}
exports.update = (req,res,next)=>{
    const groupObject = req.body
    GroupMember.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}