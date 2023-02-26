const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountName: String,
    accountNumber: String,
    currency: String,
    balance: Number,
    transactions: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}
    ,
    {
        timestamps: true //means createAt and updateAt
    }
)

const Account = mongoose.model("Account", AccountSchema)

module.exports = Account