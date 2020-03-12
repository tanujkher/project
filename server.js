const express = require('express')
const srv = express()

const dbOps = require('./dbms')

srv.set('view engine', 'hbs')

srv.use('/', express.static(__dirname + '/public'))

srv.get('/signup', (req, res) => {
    res.render('signup')
})

srv.get('/signin', (req, res) => {
    res.render('signin')
})

srv.use('/api', require('./routes/api'))

srv.listen('7722', () => {
    console.log('Server started at http://localhost:7722')
})