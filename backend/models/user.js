const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

const userModel = mongoose.Schema({
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true},
    username: {type: String, required:false},
    city: {type: String, required:false},
    speed: {type: Number, required:false},
})

userModel.plugin(uniValid)

module.exports = mongoose.model('User', userModel)