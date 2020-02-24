const express = require('express')
const srv = express()

const dbOps = require('./dbms')

srv.use('/', express.static(__dirname + '/public'))

srv.use('/signup', express.static(__dirname + '/signup'))

srv.get('/insert', (req, res) => {
    dbOps.createTable()
    .then(() => {
        dbOps.signup(req.query.email, req.query.password, req.query.address1 + ' ' + req.query.address2, req.query.city, req.query.zip)
        .then(() => {
            console.log('Insert Successfull')
            res.redirect('/')
        })
        .catch((err) => {
            console.error(err)
        })
    })
    .catch((err) => {
        if(err == undefined){
            dbOps.signup(req.query.email, req.query.password, req.query.address1 + ' ' + req.query.address2, req.query.city, req.query.state, req.query.zip)
        .then(() => {
            console.log('Insert Successfull')
            res.redirect('/')
        })
        .catch((err) => {
            console.error(err)
        })
        }
    })
})

srv.listen('7722', () => {
    console.log('Server started at http://localhost:7722')
})