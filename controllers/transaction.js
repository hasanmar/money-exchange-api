const Transaction = require('../models/Transcation')
var Account = require('../models/Account');
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
    var senderAcc = Account.findOne({ accountNumber: req.query.senderAccount }).then((account) => {
        console.log(account.balance);
        res.render('transaction/add', { account })
    })
}

exports.transaction_add_update = (req, res) => {
    const moneyToSend = req.body.amountSend
    const senderAccNum = req.query.senderAccount
    const receiverAccNum = req.body.receiverAcc

    let senderAcc;
    let receiverAcc;

    const transaction = new Transaction({
        senderAcc: senderAccNum,
        receiverAcc: receiverAccNum
    })

    Account.findOne({
        accountNumber: senderAccNum
    })
        .then(account => {
            senderAcc = account
            if (senderAcc.balance >= moneyToSend) {
                senderAcc.balance = senderAcc.balance - moneyToSend
            } else {
                response.status(400).send({ message: "insufficient balance. احسنت" });
            }
            senderAcc.save()
                .then(data => {
                    res.status(200).send(data)
                }).catch(err => {
                    res.status(500).send({ message: err.message || "internal error" })
                })
        }).catch(err => { console.log(err) })

    Account.findOne({
        accountNumber: receiverAccNum
    }).then(account => {
        receiverAcc = account
        receiverAcc.balance = parseFloat(receiverAcc.balance) + parseFloat(moneyToSend)
        receiverAcc.save().then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send({ message: err.message || "internal error" })
        })
    }).catch(err => { console.log(err) })


    // var senderAcc = Account.findOne({ accountNumber: req.query.senderAccount })
    //     .then((sender) => {
    //         console.log(sender);
    //         if (sender.balance >= moneyToSend) {
    //             const receiverAcc = Account.findOne({ accountNumber: req.body.receiverAcc })
    //                 .then(account => {
    //                     if (sender.currency === account.currency) {
    //                         sender.balance = sender.balance - moneyToSend
    //                         account.balance = parseFloat(account.balance) + parseFloat(moneyToSend)
    //                         console.log(`Sender \n ${sender} \n Receiver \n ${account}`);
    //                     } else {

    //                     }
    //                 })

    //         }
    //         else {
    //             res.send('insufficient balance.')
    //         }
    //     })

}