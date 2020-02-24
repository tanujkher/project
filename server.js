const express = require('express')
const srv = express()

const dbOps = require('./dbms')

srv.set('view engine', 'hbs')

srv.use('/', express.static(__dirname + '/public'))

srv.get('/signup', (req, res) => {
    res.render('signup')
})

srv.get('/insert', (req, res) => {
    dbOps.createTable()
    .then(() => {
        dbOps.signup(req.query.email, req.query.password, req.query.address1 + ' ' + req.query.address2, req.query.city, req.query.zip)
        .then(() => {
            console.log('Insert Successfull')
            res.redirect('/')
        })
        .catch((err) => {
            res.render('signup', {error: ['Check Your Details. Columns marked with * are Compulsory.']})
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
            res.render('signup', {error: ['Check Your Details. Columns marked with * are Compulsory.']})
        })
        }
    })
})

srv.listen('7722', () => {
    console.log('Server started at http://localhost:7722')
})