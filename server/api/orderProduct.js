const router = require('express').Router()
const isAdmin = require('./isAuth')
const {Product, User, OrderProduct, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const fetchedOrderProducts = await OrderProduct.findAll({
      where: {
        orderId: req.body.orderId
      }
    })
    res.json(fetchedOrderProducts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
