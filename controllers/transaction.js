const Transaction = require('../models/Transcation')
const Account = require('../models/Account')

exports.transaction_create_get = (req, res) => {
    Account
        .find({
            // user: {
            //     "_id": req.user.id
            // }
        })
        // .populate('user')
        .then((account) => {
            console.log(account.user);
            res.render('transaction/new', { account })
        })
        .catch((err) => {
            console.log(err);
            res.send('احسنت')
        })
}

exports.transaction_create_post = (req, res) => {
    console.log(req.body)
    const senderAcc = Account.findById(req.user.id)
    // const senderAcc = Account.findById(req.user.id)
    let transaction = new Transaction(req.body)
    transaction.save()
        .then(() => {
            res.redirect('/transaction/:transaction')
        })
        .catch((err) => {
            console.log(err);
            res.send('احسنت')
        })

    Account.
        findOne({ accountNumber: req.params.accountNumber })
}