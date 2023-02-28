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
    var newCurr = req.body.currency;

    account.user = req.session.passport.user

    var account1
    Account.find({user: req.session.passport.user})
        .then((acc) => {
            console.log(acc);
            acc.forEach(function(acc1) {
                if(acc1.currency == newCurr) {
                    res.send('You already have an account with this currency')
            }});
//             account1 = acc
//             for(let i = 0; i< account1.length; i++){
//                 if(account1.currency == account1.currency){
//                 res.send('You already have an account with this currency')
})

// }})

//             console.log(account.user);
//             res.redirect('/account/index')
        
        
        .catch((err) => {
            console.log(err);
            res.send('Something went wrong in creating the account API post');
        });
}




// account index
exports.account_index_get = (req, res) => {
    console.log(req.session.passport.user);
    Account
        .find({ user: req.session.passport.user })
        .then((account) => {
            console.log(account[0].accountNumber);
            res.render('account/index', { account })
        })
        .catch((err) => {
            console.log(err);
            res.send('احسنت')
        })
}

// account detail
exports.accountdetail_show_get = (req,res) => {
    Account.findById(req.query.id)  
  .then(account => {
    res.render("account/detail",{account : account})

  })
  .catch(err => {
    console.log(err)
})
}


// Delete account 
exports.accountdetail_delete_get = (req,res) => {
    var account
    Account.findById(req.query.id)  
 .then((acc) => {
    account = acc
    if(account.balance <= 0){
        account.deleteOne()
    res.redirect("/account/index")
    }
    else{
        res.send(' cant delete account with balance')
    }
  })
 .catch(err => {
    console.log(err)
})
}



