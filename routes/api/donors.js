const express = require('express')
const route = express.Router()
const Donor = require('../../data/dbms').Donor

route.use(express.urlencoded({extended: true}))
route.use(express.json())

route.post('/', async (req, res) => {
    donor = await Donor.findOne({
        where: {
            email: req.session.username
        }
    })
    if(donor){
        let newDonor = {}
        if(req.body.name) newDonor.name = req.body.name 
        if(req.body.donorId) newDonor.donorId = req.body.donorId
        if(req.body.medicalHistory) newDonor.medicalHistory = req.body.medicalHistory
        if(req.body.bloodgroup) newDonor.bloodgroup = req.body.bloodgroup
        console.log(req.body.lastDonation)
        if(req.body.lastDonation) newDonor.lastDonation = req.body.lastDonation
        if(req.body.gender != null) newDonor.gender = req.body.gender
        console.log('updating ' + JSON.stringify(donor) + ' to')
        console.log(newDonor)
        updateDonor = await donor.update(newDonor)
        return res.status(201).redirect('/profile')
    }else{
        newDonor = await Donor.create({
            email: req.session.username,
            name: req.body.name,
            donorId: req.body.donorId,
            medicalHistory: req.body.medicalHistory,
            bloodgroup: req.body.bloodgroup,
            lastDonation: req.body.lastDonation,
            gender: req.body.gender
        })
        return res.status(201).redirect('/profile')
    }
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