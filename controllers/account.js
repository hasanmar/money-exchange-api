const Account = require('../models/account');


// create account
// {user: {"_id": req.user.id}}
exports.account_create_get = (req, res) => {
    Account.find()
    .then(accounts => {
        res.render('account/add', {accounts})
    })
    .catch(err => {
        console.log(err)
        res.send('Something went wrong in creating the account API get');
    })
    
}


exports.create_account_post = (req, res) => {
    console.log(req.body);
    let account = new Account(req.body);

    console.log(req.body);
    account.user = req.user._id;

    account.save()
    .then(()=> {
        res.redirect('/account/index')}
    )
        .catch((err) => {console.log(err);
            res.send('Something went wrong in creating the account API post');
}); }


