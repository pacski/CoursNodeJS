const bcrypt = require('bcryptjs')
const { request } = require('../app')
const User = require('./../models/user')
const Token = require('./../models/token')
const jsontoken = require('jsonwebtoken')

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
        .catch(error=> res.status(500).json({error}))
}

exports.login = (req,res,next) => {
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
exports.createToken = (req,res,next) => {
  const user = new User({
                userId:req.body.userId,
                token: req.body.token
            })  
}