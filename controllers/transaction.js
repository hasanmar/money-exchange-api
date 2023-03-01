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
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " at "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()
    var moneyToSend = req.body.amountSend
    const senderAccNum = req.query.senderAccount
    const receiverAccNum = req.body.receiverAcc
    var moneyRate

    let senderAccount;
    let receiverAccount;

    const transaction = new Transaction({
        senderAcc: senderAccNum,
        receiverAcc: receiverAccNum
    })
    if (receiverAccNum === undefined || receiverAccNum === '' || isNaN(receiverAccNum) || receiverAccNum.length !== 11) return res.status(400).send(`account number '${receiverAccNum}' is not valid. احسنت`)
    if (moneyToSend === undefined || moneyToSend === '' || isNaN(moneyToSend) || moneyToSend < 1) return res.status(400).send(`enter an amount above 0 to send. احسنت`)

    Account.findOne({
        accountNumber: receiverAccNum
    }).populate('user')
        .then(account => {
            receiverAccount = account
        }).catch(err => { console.log(err + 'احسنت') })


    Account.findOne({
        accountNumber: senderAccNum
    })
        .populate('user')
        .then(account => {
            console.log(account.user);
            senderAccount = account
            if (receiverAccount === null || receiverAccount === undefined) return res.status(400).send('account does not exist. احسنت')
            transaction.currency = senderAccount.currency + '_' + receiverAccount.currency
            console.log(transaction.currency);
            if (senderAccount.balance >= moneyToSend) {
                if (senderAccount.currency === receiverAccount.currency) {
                    console.log(receiverAccount.user);
                    senderAccount.balance = senderAccount.balance - moneyToSend
                    receiverAccount.balance = parseFloat(receiverAccount.balance) + parseFloat(moneyToSend)
                    senderAccount.transactions.push(` sent ${senderAccount.currency} ${moneyToSend} to ${receiverAccount.user.emailAddress} on ${datetime}`)
                    receiverAccount.transactions.push(` received ${senderAccount.currency} ${moneyToSend} from ${senderAccount.user.emailAddress} on ${datetime}`)
                    transaction.transcationString = `${senderAccNum} sent ${senderAccount.currency + moneyToSend} to ${receiverAccNum} on ${datetime}`
                    transaction.save().then(console.log('transaction saved')).catch(err => { console.log(err); })
                    receiverAccount.save().then(data => {
                        console.log(data);
                    }).catch(err => {
                        console.log(err);
                    })
                    senderAccount.save()
                        .then(data => {
                            console.log(data);
                            res.redirect('/account/index')
                        }).catch(err => {
                            console.log(err);
                        })
                } else {
                    Rate.findOne({ currencyCombination: transaction.currency })
                        .then(r => {
                            moneyRate = moneyToSend * r.rate
                            senderAccount.balance = senderAccount.balance - moneyToSend
                            receiverAccount.balance = parseFloat(receiverAccount.balance) + parseFloat(moneyRate)
                            senderAccount.transactions.push(` sent ${senderAccount.currency} ${moneyToSend} to ${receiverAccount.user.emailAddress} on ${datetime}`)
                            receiverAccount.transactions.push(` received ${receiverAccount.currency} ${moneyRate} from ${senderAccount.user.emailAddress} on ${datetime}`)
                            transaction.transcationString = `${senderAccNum} sent ${senderAccount.currency + moneyToSend} to ${receiverAccNum} on ${datetime}`
                            transaction.save().then(console.log('transaction saved')).catch(err => { console.log(err); })
                            receiverAccount.save().then(data => {
                                console.log(data);
                            }).catch(err => {
                                console.log(err);
                            })
                            senderAccount.save()
                                .then(data => {
                                    console.log(data);
                                    res.redirect('/account/index')
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