const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/donors', require('./donors'))
route.use('/donate', require('./donate'))
route.use('/emergency', require('./emergency'))
route.use('/addRequest', require('./addRequest'))

exports = module.exports = route
