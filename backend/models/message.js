const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    body: {type: String, required:true},
    autor:{type: String, required:true},
    createdAt:{type: Date, required:false}
})

messageSchema.virtual('owner', {
   ref: 'User', //The Model to use
   localField: 'autor', //Find in Model, where localField 
   foreignField: '_id', // is equal to foreignField
});

messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Message', messageSchema)