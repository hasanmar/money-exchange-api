const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountName: String,
    accountNumber : String,
    currency: String,
    balance: Number,
    transactions: [String],
    emailAddress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}
,
{
    timestamps: true //means createAt and updateAt
}

)

const Account = mongoose.model("Account", articleSchema)

module.exports = Account

