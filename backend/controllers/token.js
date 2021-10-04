const Token = require('../models/token')
const fs = require('fs')
exports.createToken = (req,res,next)=>{
    const postObject = req.body
    delete postObject._id;
    const p = new Token({
        ...postObject,
    })
    p.save()
        .then(() => res.status(201).json({message : 'ok'}))
        .catch(error => res.status(400).json({ error}))
}
