const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('./lib/passportConfig');

const port = 4000

const app = express()
const layout = require('express-ejs-layouts')

app.use(layout)


const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth')
const accountRoute = require('./routes/accounts')
const transactionRoute = require('./routes/transactions')

app.use(session({
    secret: 'security',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 604800}
}))

app.use('/', indexRoute)
app.use('/', authRoute)
app.use('/', accountRoute)
// app.use('/', transactionRoute)




app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

mongoose.set('strictQuery', false)

app.set('view engine', 'ejs')

mongoose.connect('mongodb+srv://hasan:hasan@cluster0.f2mq1pr.mongodb.net/moneyTransfer?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log(`connected`);
    }
)