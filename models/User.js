const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('../lib/passportConfig');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true},
    recoveryKey: {type: String, required: true},
    password: {type: String, required: true}
},
{
    timestamps: true
})

userSchema.methods.verifyPassword = function(password) {
    return  bcrypt.compareSync(password, this.password)
}


const User = mongoose.model('User', userSchema);


module.exports = User 


