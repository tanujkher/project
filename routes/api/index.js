const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/donors', require('./donors'))
route.use('/donate', require('./donate'))

exports = module.exports = route
