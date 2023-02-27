const passport = require('passport')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

// This saves the ID in the session
passport.serializeUser(function(user, done){
    done(null, user.id)
})

// Retrieves the user from the database according to the ID from the session
passport.deserializeUser(function(id, done){
   if( mongoose.Types.ObjectId.isValid(id)){
    User.findById(id, function(err, user){
        done(err, user)
    })
   }
})

passport.use(new LocalStrategy({
    usernameField: 'emailAddress',
    passwordField: 'password'
},
    function (emailAddress, password, done) {
        User.findOne({ emailAddress: emailAddress }, function (err, user) {
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            if (!user.verifyPassword(password)) { return done(null, false) }
            return done(null, user)
        })
    }
))

module.exports = passport