const mongoose = require('mongoose')


const ratesSchema = mongoose.Schema({
    currencyCombination: String,
    Rate: Number
},
    {
        timestamps: true
    })


const Rates = mongoose.model('Rates', ratesSchema)

module.exports = Rates