const Account = require("../models/Account");

// create account
// {user: {"_id": req.user.id}}
exports.account_create_get = (req, res) => {
  console.log(req.session);
  Account.find()
    .then((accounts) => {
      res.render("account/add", { accounts });
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went wrong in creating the account API get");
    });
};

exports.create_account_post = (req, res) => {
  let account = new Account(req.body);
  var newCurr = req.body.currency;
  var found = false;
  account.user = req.session.passport.user;
  console.log(account);
  Account.find({ user: account.user })
    .then((acc) => {
      console.log(acc);
      acc.forEach(function (acc1) {
        if (acc1.currency == newCurr) {
          console.log(found);
          console.log(acc1.currency);
          found = true;
        }
      });
      if (found) {
        res.send("already have an account in that currency. احسنت ");
      } else {
        account
          .save()
          .then(res.redirect("/account/index"))
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went wrong in creating the account API post");
    });
};

// account index
exports.account_index_get = (req, res) => {
  Account.find({ user: req.session.passport.user })
    .then((account) => {
      console.log(account);
      if (account === [] || account === null || account === undefined || account.length < 1) return res.render("account/add")
      res.render("account/index", { account });
    })
    .catch((err) => {
      console.log(err);
      res.send("احسنت");
    });
};

// account detail
exports.accountdetail_show_get = (req, res) => {
  Account.findById(req.query.id)
    .then((account) => {
      res.render("account/detail", { account: account });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete account
exports.accountdetail_delete_get = (req, res) => {
  var account;
  Account.findById(req.query.id)
    .then((acc) => {
      account = acc;
      if (account.balance <= 0) {
        account.deleteOne();
        res.redirect("/account/index");
      } else {
        res.send(" cant delete account with balance. احسنت");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
