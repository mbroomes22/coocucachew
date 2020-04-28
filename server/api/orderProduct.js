const router = require('express').Router()
const isAdmin = require('../../utils/isAuth')
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

router.put('/:orderId', async (req, res, next) => {
  const {quantity, productId, orderId} = req.body
  try {
    if (req.session.passport.user) {
      const productToUpdate = await OrderProduct.findOne({
        where: {
          orderId: req.params.orderId,
          productId: OrderProduct.productId
        }
      })
      const loggedUserOrder = await Order.findOne({
        where: {
          userId: req.session.passport.user,
          id: req.params.id
        }
      })
      if (productToUpdate.orderId !== loggedUserOrder.id) {
        console.error('You are not authoritzed to update this order')
      } else {
        await productToUpdate.update({
          quantity: quantity,
          productId: productId,
          orderId: orderId
        })
        res.status(200).json(productToUpdate)
      }
      console.log('--->  FOUND AN ORDER W A USER  <---')
    } else {
      const productToUpdate = await OrderProduct.findOne({
        where: {
          orderId: req.params.orderId,
          productId: OrderProduct.productId
        }
      })
      console.log('--->  FOUND AN ORDER W/O A USER  <---')
      await productToUpdate.update({
        quantity: quantity,
        productId: productId,
        orderId: orderId
      })
      res.status(200).json(productToUpdate)
    }
    console.log('-------->  UPDATED AN ORDER  <--------')
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      const fetchedOrder = await Order.destroy({
        where: {
          userId: req.session.passport.user,
          orderId: req.params.id,
          isPending: true
        }
      })
      console.log('--->  DELETED AN ORDER W A USER  <---')
      res.json(fetchedOrder)
    } else {
      const fetchedOrder = await Order.destroy({
        where: {
          orderId: req.params.id,
          isPending: true
        }
      })
      console.log('--->  DELETED AN ORDER W/O A USER  <---')
      res.status(201).json(fetchedOrder)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
