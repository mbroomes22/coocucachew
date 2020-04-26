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
    console.log(
      '|||||||||||||inside order router||||||||||||||||||',
      fetchedOrder
    )
    res.json(fetchedOrder)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   // try {
//   //   const newItem = await Order.create(req.body)
//   //   req.send(newItem)
//   // } catch (err) {
//   //   next(err)
//   // }
//   try {
//     //if guest
//     let order
//     if (!req.body.userId) {
//       order = await Order.findOrCreate({
//         where: {
//           userId: null,
//           status: 'Pending'
//         },
//         include: [Product]
//       })
//     } else {
//       //if user
//       order = await Order.findOrCreate({
//         where: {
//           userId: req.body.userId,
//           status: 'Pending'
//         },
//         include: [Product]
//       })
//     }
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
