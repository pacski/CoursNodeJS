const bcrypt = require('bcryptjs')
const { request } = require('../app')
const Message = require('./../models/message')
const jsontoken = require('jsonwebtoken')
const server = require('../server')

exports.list = (req, res, next) => {
    Message.find().populate('owner')
        .then((messages) => {
            if (messages) {
                res.status(200).json(messages)
            }
    })
}
exports.create = (req, res, next) => {
    const messageObject = req.body
    delete messageObject._id;
    const p = new Message({
        ...messageObject,
    })
    p.save()
        .then(() => res.status(201).json(p))
        .catch(error => res.status(400).json({ error}))
}
exports.delete = (req, res, next) => {
       Message.findOne({_id:req.params.id})
        .then( message => {
            Message.deleteOne({_id: req.params.id})
                .then(()=> res.status(200).json({message: 'ok'}))
                .catch(error => res.status(400).json({error: 'erroooos'}))
        })
        .catch(error => res.status(500).json({error:"test"}))  
}
exports.update = (req,res,next)=>{
    const messageObject = req.body
    Message.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}