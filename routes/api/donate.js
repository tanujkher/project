const express = require('express')
const route = express.Router()

const Donor = require('../../data/dbms').Donor
const db = require('../../data/dbms').db

route.get('/enlist', async (req, res) => {
    if(!req.session.username){
        return res.redirect('/signin')
    }
    const donor = await Donor.findOne({
        where: {
            email: req.session.username
        }
    })
    if(donor){
        if(donor.name && donor.medicalHistory && donor.bloodgroup){
            donor.update({
                enlist: true
            })
            await db.sync()
            return res.redirect('/profile')
        }else{
            return res.render('details', {
                error: ['Enter Bloodgroup, Name and Medical History to get enlisted']
            })
        }
    }else{
        return res.redirect('/details')
    }
})

exports = module.exports = route