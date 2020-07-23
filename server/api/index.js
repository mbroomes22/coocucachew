const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/products', require('./product'))

router.use('/orderProduct', require('./orderProduct'))

router.use('/oderProduct/:orderId', require('./orderProduct'))

router.use('/order', require('./order'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
