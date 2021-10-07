const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    body: {type: String, required:true},
    autor:{type: String, required:true},
    createdAt:{type: Date, required:false}
})

module.exports = mongoose.model('Message', messageSchema)