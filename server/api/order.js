const router = require('express').Router()
// const isAuth = require('./isAuth')
const {Product, User, orderProduct, Order} = require('../db/models')

//is auth or isAdmin
// authorizations folder with isAdmin and isAuth plus any others
//authhelpers.js
router.get('/', async (req, res, next) => {
  try {
    const fetchedOrder = await Order.findAll({
      where: {
        ///ISPENDING TRUE OR FALSE
        userId: req.session.passport.user,
        isPending: true
      },
      include: Product
    })
    res.json(fetchedOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  console.log('REQ.BODY IN ORDER PUT ROUTE')
  try {
    //check object and update
    const orderToUpdate = await Order.findByPk(req.params.id)
  } catch (err) {
    next(err)
  }
})

// implement delete route

router.post('/', async (req, res, next) => {
  try {
    //if guest
    let order
    if (!req.body.userId) {
      console.log('^^See Me! I am Req.body:^^', req.body)
      order = await Order.findOrCreate({
        where: {
          userId: null,
          isPending: 'True'
        },
        include: [Product]
      })
    } else {
      //if user
      console.log('^^See Me! I am Req.body2:^^', req.body)
      order = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          isPending: 'True'
        },
        include: [Product]
      })
    }
    console.log('$I am order:$', order)
    const orderId = order[0].dataValues.id
    const currentOrder = await Order.findByPk(orderId)
    await currentOrder.addProduct(req.body.orderProduct.id)
    const productOrder = await orderProduct.findOne({
      where: {
        productId: req.body.orderProduct.id,
        orderId: orderId
      }
    })
    console.log('!!!!PRODUCT_ORDER!!!!', productOrder)
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
