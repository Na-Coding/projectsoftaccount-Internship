const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3013
const version = '/api/v1/'
var bodyParser = require('body-parser');
var logger = require('morgan')
var moment = require('moment')
var fs = require('fs')
const cookieSession = require('cookie-session')
const cors = require('cors')

var mm = moment()
var date = mm.utc().format('DD-MM-YYYY')
var time = mm.utc().format('HH: mm: ss')

const corsOptions = {
    origin: (origin, cb) => {
        console.log(origin);
        cb(null, true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER')
//     res.setHeader('Access-Control-Allow-Credentials', true)

//     // Pass to next layer of middleware
//     next()
// });

app.use(logger('dev'))
var accessLogStream = fs.createWriteStream(`${__dirname}/logs/${date}.log`, {
    flags: 'a'
})
var configlog = `[${time}] [ip]: :remote-addr :remote-user [method]: :method [url]: :url HTTP/:http-version [status]: :status [response-time]: :response-time ms [client]: :user-agent`
app.use(logger(configlog, {
    stream: accessLogStream
}))


var customer = require('./src/router/customer')
var invoice = require('./src/router/invoice')
var quotation = require('./src/router/quotation')
var receipt = require('./src/router/receipt')
var user = require('./src/router/user')


app.use(cookieSession({
    name: 'ck_1',
    keys: ['cookie'],
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true
}))
app.use(version + 'customer', customer)
app.use(version + 'invoice', invoice)
app.use(version + 'quotation', quotation)
app.use(version + 'receipt', receipt)
app.use(version + 'user', user)




var server = app.listen(port, function () {
    console.log('Server is running port: ' + port);
});
