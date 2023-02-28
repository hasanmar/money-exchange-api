const express = require('express')
const router = express.Router();
const isLoggedIn = require('../lib/isLoggedIn')

const accountCntrol = require('../controllers/account')



router.use(express.urlencoded({extended:true}))


// create account
router.get('/account/add', isLoggedIn, accountCntrol.account_create_get)
router.post('/account/add', accountCntrol.create_account_post)

module.exports = router

