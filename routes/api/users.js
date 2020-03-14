const express = require('express')
const route = express.Router()
const session = require('express-session')

route.use(session({
    secret: 'Along unguessable string',
    resave: 'false',
    saveUninitialized: 'true'
}))

route.use(express.urlencoded({extended: true}))
route.use(express.json())

const User = require('../../data/dbms').User

route.get('/signup', (req, res) => {
    User.findAll()
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        res.status(500).send({
            error: 'Couldn\'t retrieve users'
        })
    })
})

route.post('/signup', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
        address: req.body.address1 + ' ' + req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    })
    .then((user) => {
        res.status(201).render('signup', {
            success: ['Sign-up successfull try to']
        })
    }).catch((err) => {
        res.status(501).render('signup', {
            error: ['Error in Sign-up']
        })
    })
})

route.post('/signin', (req, res) => {
    User.findAll({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if(user.length == 0){
            return res.status(501).render('signin', {
                error: ['Username doesn\'t exist']
            })
        }
        if(user[0].dataValues.password != req.body.password){
            return res.status(501).render('signin', {
                error: ['Incorrect password']
            })
        }
        req.session.username = req.body.email
        res.redirect('/profile')
    }).catch((err) => {
        return res.status(501).render('signin', {
            error: ['Username doesn\'t exist']
        })
    })
})

exports = module.exports = route