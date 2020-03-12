const express = require('express')
const srv = express()
const session = require('express-session')

const User = require('./dbms').User

srv.use(session({
    secret: 'Along unguessable string',
    resave: 'false',
    saveUninitialized: 'true'
}))

srv.set('view engine', 'hbs')

srv.use('/', express.static(__dirname + '/public'))

srv.get('/signup', (req, res) => {
    res.render('signup')
})

srv.get('/signin', (req, res) => {
    res.render('signin')
})

srv.use('/api', require('./routes/api'))

srv.get('/changeUser', (req, res) => {
    console.log(JSON.stringify(req.query))
    req.session.username = req.query.email 
    req.session.save()
    res.redirect('/profile')
})

srv.get('/profile', (req, res) => {
    if(!req.session.username){
        res.redirect('signin')
    }
    User.findAll({
        where: {
            email: req.session.username
        }
    }).then((user) => {
        res.render('profile', {
            user: user[0].dataValues
        })
    })
})

srv.listen('7722', () => {
    console.log('Server started at http://localhost:7722')
})