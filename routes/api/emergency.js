const express = require('express')
const route = express.Router()
const { Op } = require('sequelize')

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
            const Donors = await Donor.findAll({
                where: {
                    [Op.and]: {
                        bloodgroup: recipient.bloodgroup,
                        [Op.not]: {
                            email: recipient.email
                        }
                    }
                }
            })
            return res.render('donationCards', {
                Donors: Donors
            })
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