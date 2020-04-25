const router = require('express').Router()
const isAdmin = require('./isAdmin')
const {Product, User, orderProduct, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const fetchedOrderProducts = await orderProduct.findAll({
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
