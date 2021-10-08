const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({

    name: {type: String, required:true},
    userId:{type: String, required:true},
})

groupSchema.virtual('owner', {
   ref: 'User', //The Model to use
   localField: 'userId', //Find in Model, where localField 
   foreignField: '_id', // is equal to foreignField
});

groupSchema.virtual('groupMembers', {
   ref: 'GroupMember', //The Model to use
   localField: '_id', //Find in Model, where localField 
   foreignField: 'groupId', // is equal to foreignField
});

groupSchema.set('toObject', { virtuals: true });
groupSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Group', groupSchema)