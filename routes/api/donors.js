const express = require('express')
const route = express.Router()
const Donor = require('../../dbms').Donor

route.use(express.urlencoded({extended: true}))
route.use(express.json())

route.post('/', (req, res) => {
    Donor.create({
        email: req.session.username,
        name: req.body.name,
        donorId: req.body.donorId,
        medicalHistory: req.body.medicalHistory,
        bloodgroup: req.body.bloodgroup,
        lastDonation: req.body.lastDonation,
        gender: req.body.gender
    }).then((donor) => {
        res.status(201).send(donor)
    }).catch((err) => {
        res.status(501).send({
            error: 'Couldn\'t create user'
        })
    })
})

route.get('/', (req, res) => {
    Donor.findAll()
    .then((donors) => {
        res.status(200).send(donors)
    })
    .catch((err) => {
        res.status(500).send({
            error: 'Couldn\'t retrieve donors'
        })
    })
})

exports = module.exports = route