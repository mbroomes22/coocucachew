const router = require('express').Router()
const isAuth = require('./isAuth')
const {Product, User, orderProduct, Order} = require('../db/models')

router.get('/', isAuth, async (req, res, next) => {
  try {
    const fetchedOrder = await Order.findOne({
      where: {
        userId: req.body.userId
      }
    })
    res.json(fetchedOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
