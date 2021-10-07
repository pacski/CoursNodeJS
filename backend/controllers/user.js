const bcrypt = require('bcryptjs')
const { request } = require('../app')
const User = require('./../models/user')
const jsontoken = require('jsonwebtoken')
const app = require('../app')
const user = require('./../models/user')
exports.signup = (req,res,next) =>{
    console.log('begin sign')

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log('1')
            const user = new User({
                email:req.body.email,
                password: hash
            })  
            user.save()
                .then(()=> res.status(201).json({message: 'create user'}))
                .catch(error=> res.status(400).json({error}))
        })
        .catch(error => {
        if (!error.response) {
            // network error
            this.errorStatus = 'Error: Network Error';
        } else {
            this.errorStatus = error.response.data.message;
        }
      })
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({error: 'pas trouvé'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(ok =>{
                    if(!ok){
                        return res.status((401).json({error: 'incorect mdp'}))
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsontoken.sign(
                            {userId: user._id},'jesuissecret',{ expiresIn:'48h'}
                        )
                    })
                })
                .catch(error=> res.status(500).json({error}))
        })
}

exports.show = (req, res, next) => {
    User.findOne({ _id: req.body.userId })
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'pas trouvé'})
            }
            res.status(200).json(user)
        })
    .catch(error => res.status(500).json({error: error}))  
}

exports.update = (req,res,next)=>{
    User.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}