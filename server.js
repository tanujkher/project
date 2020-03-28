const express = require('express')
const srv = express()
const session = require('express-session')

const SERVER_PORT = process.env.PORT || 7722

const { db, User, Donor, Request } = require('./data/dbms')

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

srv.get('/details', (req, res) => {
    if(!req.session.username){
        return res.redirect('/signin')
    }
    res.render('details')
})

srv.get('/profile', (req, res) => {
    if(!req.session.username){
        return res.redirect('/signin')
    }
    User.findAll({
        where: {
            email: req.session.username
        }
    }).then(async (user) => {
        let donor = await Donor.findAll({
            where: {
                email: req.session.username
            }
        })
        let count = 0
        let verified = false
        if(donor[0]){
            if(donor[0].dataValues.name) count++
            if(donor[0].dataValues.donorId) count++
            if(donor[0].dataValues.medicalHistory) count++ 
            if(donor[0].dataValues.bloodgroup) count++
            if(donor[0].dataValues.lastDonation != 'Invalid Date' && donor[0].dataValues.lastDonation != null) count++
            if(donor[0].dataValues.gender && donor[0].dataValues.gender != null) count++
            if(donor[0].dataValues.enlist) verified = true
        }
        const request = await Request.findAll({
            where: {
                name: req.session.username
            }
        })
        res.render('profile', {
            user: user[0].dataValues,
            verified: verified,
            completion: (count * 100) / 6,
            requests: request
        })
    })
})

db.sync()
.then(() => {
    console.log('Database has been synced')
    srv.listen(SERVER_PORT, () => {
        console.log(`Server started at http://localhost:${SERVER_PORT}`)
    })
})
.catch(() => {
    console.log('Error creating database')
})