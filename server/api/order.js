const router = require('express').Router()
// const isAuth = require('./isAuth')
const {Product, User, orderProduct, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const fetchedOrder = await Order.findOne({
      where: {
        userId: req.session.passport.user
      },
      include: Product
    })
    console.log('inside order router', fetchedOrder)
    res.json(fetchedOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
