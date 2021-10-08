const mongoose = require('mongoose')

const groupMemberSchema = mongoose.Schema({

    groupId: {type: String, required:true},
    userId:{type: String, required:true},
})

groupMemberSchema.virtual('owner', {
   ref: 'User', //The Model to use
   localField: 'userId', //Find in Model, where localField 
   foreignField: '_id', // is equal to foreignField
});
groupMemberSchema.virtual('group', {
   ref: 'Group', //The Model to use
   localField: 'groupId', //Find in Model, where localField 
   foreignField: '_id', // is equal to foreignField
});

groupMemberSchema.set('toObject', { virtuals: true });
groupMemberSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('GroupMember', groupMemberSchema)