const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')

router.get('/', transactionController.transaction_create_get)

module.exports = router