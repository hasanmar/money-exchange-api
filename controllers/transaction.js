const Transaction = require('../models/Transcation')
var Account = require('../models/Account');
var Rate = require('../models/Rates');
const { find } = require('../models/Transcation');
const { updateOne } = require('../models/Account');

exports.transaction_create_get = (req, res) => {
    console.log(req.session.passport.user);
    Account
        .find({ user: req.session.passport.user })
        .then((account) => {
            console.log(account[0].accountNumber);
            res.render('transaction/new', { account })
        })
        .catch((err) => {
            console.log(err);
            res.send('احسنت')
        })
}

exports.transaction_add_get = (req, res) => {
    Account.findOne({ accountNumber: req.query.senderAccount }).then((account) => {
        res.render('transaction/add', { account })
    })
}

exports.transaction_add_update = (req, res) => {
    var moneyToSend = req.body.amountSend
    console.log(moneyToSend);
    const senderAccNum = req.query.senderAccount
    const receiverAccNum = req.body.receiverAcc

    let senderAccount;
    let receiverAccount;

    const transaction = new Transaction({
        senderAcc: senderAccNum,
        receiverAcc: receiverAccNum
    })

    Account.findOne({
        accountNumber: receiverAccNum
    }).then(account => {
        receiverAccount = account
        transaction.currency = receiverAccount.currency
    }).catch(err => { console.log(err) })

    Account.findOne({
        accountNumber: senderAccNum
    })
        .then(account => {
            senderAccount = account
            transaction.currency = senderAccount.currency + '_' + receiverAccount.currency
            console.log(transaction.currency);
            if (senderAccount.balance >= moneyToSend) {
                if (senderAccount.currency === receiverAccount.currency) {
                    senderAccount.balance = senderAccount.balance - moneyToSend
                    receiverAccount.balance = parseFloat(receiverAccount.balance) + parseFloat(moneyToSend)
                    senderAccount.transactions.push(` sent ${senderAccount.currency} ${moneyToSend} to ${receiverAccount.accountName}`)
                    receiverAccount.transactions.push(` received ${senderAccount.currency} ${moneyToSend} from ${senderAccount.accountName}`)
                    receiverAccount.save().then(data => {
                        console.log(data);
                    }).catch(err => {
                        console.log(err);
                    })
                    senderAccount.save()
                        .then(data => {
                            console.log(data);
                            res.redirect('account/index')
                        }).catch(err => {
                            console.log(err);
                        })
                } else {
                    Rate.findOne({ currencyCombination: transaction.currency })
                        .then(r => {
                            console.log(r + '\n' + r.rate);
                            moneyToSend = moneyToSend * r.rate
                            senderAccount.balance = senderAccount.balance - moneyToSend
                            receiverAccount.balance = parseFloat(receiverAccount.balance) + parseFloat(moneyToSend)
                            senderAccount.transactions.push(` sent ${senderAccount.currency} ${req.body.amountSend} to ${receiverAccount.accountName}`)
                            receiverAccount.transactions.push(` received ${receiverAccount.currency} ${moneyToSend} from ${senderAccount.accountName}`)
                            receiverAccount.save().then(data => {
                                console.log(data);
                            }).catch(err => {
                                console.log(err);
                            })
                            senderAccount.save()
                                .then(data => {
                                    console.log(data);
                                    res.redirect('account/index')
                                }).catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            } else {
                res.status(400).send({ message: "insufficient balance. احسنت" });
            }

        })
        .catch(err => { console.log(err); })
}