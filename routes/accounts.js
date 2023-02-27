const express = require('express')
const router = express.Router();
const isLoggedIn = require('../lib/isLoggedIn')

const accountCntrol = require('../controllers/account')



router.use(express.urlencoded({extended:true}))


// create account
router.get('/account/add',isLoggedIn ,accountCntrol.account_create_get)
router.post('/account/add', accountCntrol.create_account_post)

router.get('/account/index', accountCntrol.account_index_get)

router.get('/account/detail' , accountCntrol.accountdetail_show_get)

router.get('/account/delete', accountCntrol.accountdetail_delete_get)



module.exports = router


// 

