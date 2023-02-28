const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("../lib/passportConfig");




exports.auth_signup_get = (req, res) => {
  res.render("auth/signup");
};


exports.auth_signin_get = (req, res) => {
  res.render("auth/signin");
};


exports.auth_signin_get = (req, res) => {
    res.render('auth/signin');
}

exports.auth_signup_post = (req, res) => {
  console.log("1");
  console.log(req.body.password);
  let user = new User(req.body);
  let hash = bcrypt.hashSync(req.body.password, 10);
  let recoveryHash = bcrypt.hashSync(req.body.recoveryKey, 10);

  // console.log(hash)

  user.password = hash;
  user.recoveryKey = recoveryHash;
  user
    .save()
    .then(() => {
      res.redirect("/auth/signin");
      console.log(req.user);
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went wrong, please try again later!");
    });
};

exports.auth_signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
});

// exports.auth_signout_get = (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//   });
//   res.redirect("/auth/signin");
// };

exports.auth_forget_get = (req, res) => {
  res.render("auth/forget");
};

exports.auth_update_get = (req, res) => {
  res.render("auth/updatepassword");
};

// exports.auth_forget_post = passport.authenticate("local", {
//     successRedirect: "/auth/updatepassword",
//     failureRedirect: "/auth/forget"
// });

exports.auth_forget_post = (req, res) => {
  let key = req.body.recoveryKey;

  let checkUser = User.findOne({ emailAddress: req.body.email })
    .then((user) => {
      let isValidKey = bcrypt.compareSync(key, user.recoveryKey) ? true : false;
      console.log(isValidKey);
      if (!isValidKey) {
        console.log("failed to compare");
        res.redirect("/auth/forget");
      } else {
        console.log("success");
        res.redirect("/auth/updatepassword");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // let isValidKey = false;
};

// user
// .then(() => {
//   res.redirect("/auth/signin");
//   console.log(req.user);
// })
// .catch((err) => {
//   console.log(err);
//   res.send("Something went wrong, please try again later!");
// });
// console.log('isValidKey');
