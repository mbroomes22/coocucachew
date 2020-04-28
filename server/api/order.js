const router = require('express').Router()
// const isAuth = require('../../utils/isAuth)
const {Product, User, OrderProduct, Order} = require('../db/models')

//is auth or isAdmin
// authorizations folder with isAdmin and isAuth plus any others
//authhelpers.js
router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      const fetchedOrder = await Order.findOrCreate({
        where: {
          userId: req.session.passport.user,
          isPending: true
        },
        include: Product
      })
      console.log('--->  FETCHED OR CREATED AN ORDER W A USER  <---')
      res.json(fetchedOrder)
    } else {
      const fetchedOrder = await Order.create({
        isPending: true,
        userId: null
      })
      console.log('--->  CREATED AN ORDER W/O A USER  <---')
      res.json(fetchedOrder)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  const {id, isPending, userId, total, subtotal, products} = req.body
  try {
    if (req.session.passport.user) {
      const orderToUpdate = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.session.passport.user
        },
        include: Product
      })
      console.log('---->  GOT AN ORDER W A USER  <----')
    } else {
      const orderToUpdate = await Order.findOne({
        where: {
          id: req.params.id
        },
        include: Product
      })
      console.log('---->  GOT AN ORDER WITHOUT A USER  <----')
    }
    await orderToUpdate.update({
      id: id,
      isPending: isPending,
      userId: userId,
      total: total,
      subtotal: subtotal,
      products: products
    })
    console.log('---->  UPDATED AN ORDER   <----')
    res.status(200).json(orderToUpdate)
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

router.post('/', async (req, res, next) => {
  try {
    //if guest
    let order
    if (!req.body.userId) {
      // console.log('^^See Me! I am Req.body:^^', req.body)
      order = await Order.findOrCreate({
        where: {
          userId: null,
          isPending: 'True'
        },
        include: [Product]
      })
    } else {
      //if user
      // console.log('^^See Me! I am Req.body2:^^', req.body)
      order = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          isPending: 'True'
        },
        include: [Product]
      })
    }
    // console.log('$I am order:$', order)
    const orderId = order[0].dataValues.id
    const currentOrder = await Order.findByPk(orderId)
    await currentOrder.addProduct(req.body.orderProduct.id)
    const productOrder = await OrderProduct.findOne({
      where: {
        productId: req.body.orderProduct.id,
        orderId: orderId
      }
    })
    // console.log('!!!!PRODUCT_ORDER!!!!', productOrder)
    const qty = productOrder.dataValues.quantity
    await productOrder.update({
      quantity: qty + 1
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
