const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')
const isLoggedIn = require('../lib/isLoggedIn')

router.get('/transaction/new', isLoggedIn, transactionController.transaction_create_get)
router.get('/transaction/add', transactionController.transaction_add_get)
router.patch('/transaction/add', transactionController.transaction_add_update)

module.exports = router