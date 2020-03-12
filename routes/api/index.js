const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/donors', require('./donors'))

exports = module.exports = route
