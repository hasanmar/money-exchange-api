const mongoose = require('mongoose')


const transactionSchema = mongoose.Schema({
    senderAcc: Number,
    receiverAcc: Number,
    currency: String,
    transcationString: String
},
    {
        timestamps: true
    })


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction