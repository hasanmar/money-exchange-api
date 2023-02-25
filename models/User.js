const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true},
    recoveryKey: {type: String, required: true},
    accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
    password: {type: String, required: true}
},
{
    timestamps: true
})


const User = mongoose.model('User', userSchema);


module.exports = User 


