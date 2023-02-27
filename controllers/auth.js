
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('../lib/passportConfig')




exports.auth_signup_get = (req, res) => {
    res.render('auth/signup')
}


exports.auth_signin_get = (req, res) => {
    res.render('auth/signin')
}


exports.auth_signin_get = (req, res) => {
    res.render('auth/signin');
}

exports.auth_signup_post = (req, res) => {
    console.log('1')
    console.log(req.body.password)
    let user = new User(req.body)
    let hash = bcrypt.hashSync(req.body.password, 10)
    // console.log(hash)

    user.password = hash

    user.save()
        .then(() => {
            res.redirect('/auth/signin')
            console.log(req.user);
        })
        .catch(err => {
            console.log(err)
            res.send('Something went wrong, please try again later!')
        })
}

exports.auth_signin_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/signin'
})



exports.auth_signout_get = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    res.redirect('/auth/signin');
}

exports.auth_forget_get = (req, res) => {
    res.render('auth/forget')
}

exports.auth_update_get = (req, res) => {
    res.render('auth/updatepassword')
}

exports.auth_forget_post = (req, res) => {
    res.redirect('/auth/updatepassword')
}