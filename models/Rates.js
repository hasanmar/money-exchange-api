const mongoose = require('mongoose')


const ratesSchema = mongoose.Schema({
    currencyCombination: String,
    Rate: Number
},
    {
        timestamps: true
    })


const Rates = mongoose.model('Rates', ratesSchema)
const BHD_USD = new Rates({
    currencyConversion: 'BHD_USD',
    rate: 0.375
  });
module.exports = Rates