const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')

router.get('/transaction/new', transactionController.transaction_create_get)
router.post('/transaction/new/:accountNumber', transactionController.transaction_create_post)
// router.post('/:accountId/add', transactionController.transaction_create_post)

module.exports = router