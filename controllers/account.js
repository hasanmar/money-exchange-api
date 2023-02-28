const Account = require('../models/Account');


// create account
// {user: {"_id": req.user.id}}
exports.account_create_get = (req, res) => {
    console.log(req.session.passport.user);

    Account.find()
        .then(accounts => {
            res.render('account/add', { accounts })
        })
        .catch(err => {
            console.log(err)
            res.send('Something went wrong in creating the account API get');
        })

}


exports.create_account_post = (req, res) => {
    console.log(req.session.passport.user);
    let account = new Account(req.body);
    account.user = req.session.passport.user

    account.save()
        .then(() => {
            console.log(account.user);
            res.redirect('/account/index')
        }
        )
        .catch((err) => {
            console.log(err);
            res.send('Something went wrong in creating the account API post');
        });
}




