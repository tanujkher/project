const express = require('express')
const route = express.Router()

const Donor = require('../../data/dbms').Donor

route.get('/', async (req, res) => {
    if(!req.session.username){
        return res.redirect('/signin')
    }
    const recipient = await Donor.findOne({
        where: {
            email: req.session.username
        }
    })
    if(recipient){
        if(recipient.bloodgroup){
            return res.render('donationCards')
        }else{
            return res.render('details', {
                error: ['Please enter Bloodgroup so that we can enlist donors for you']
            })
        }
    }else{
        return res.redirect('/details')
    }
})

exports = module.exports = route