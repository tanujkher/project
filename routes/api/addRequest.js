const express = require('express')
const route = express.Router()
const { Op } = require('sequelize') 
const { Request, Donor } = require('../../data/dbms')

route.use(express.urlencoded({extended: true}))
route.use(express.json())

route.post('/', async (req, res) => {
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
            const requests = await Request.findAll({
                where: {
                    [Op.and]: { 
                        name: req.body.email,
                        email: req.session.username
                    }
                }
            })
            if(requests.length != 0){
                return res.render('donationCards', {
                    Donors: Donors,
                    error: ['You have already requested ' + req.body.email]
                })
            }else{
                console.log(req.session.username)
                const newRequest = await Request.create({
                    name: req.body.email,
                    email: req.session.username,
                    gender: recipient.gender,
                    donorId: recipient.donorId,
                    reqName: recipient.name
                })
                return res.render('donationCards', {
                    Donors: Donors,
                    success: ['Request send to ' + req.body.email]
                })
            }
        }else{
            return res.redirect('/details')
        }
    }else{
        return res.redirect('signin')
    }
})

exports = module.exports = route