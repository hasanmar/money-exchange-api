const Transaction = require('../models/Transcation')
const Account = require('../models/Account')

exports.transaction_create_get = (req, res) => {
    Account.find()
        .then((account) => {
            res.render('transaction/:account/new', { account })
        })
        .catch((err) => {
            console.log(err);
            res.send('احسنت')
        })
}

exports.transaction_create_post = (req, res) => {
    console.log(req.body)
    let transaction = new Transaction(req.body)
    transaction.save()
        .then(() => {
            res.redirect('/transaction/:transaction')
        })
        .catch((err) => {
            console.log(err);
            res.send('احسنت')
        })
}