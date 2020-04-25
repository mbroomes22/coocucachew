const router = require('express').Router()
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isPending: {
    // isPending = true means that the order is incomplete
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

///make a hook to sum up the cart
// const getSubTotal = async function (order) {
//   try {
//     const orderedProducts = await OrderProduct.get('/', order.id)
//     console.log(orderedProducts)
//       let pOSubTotal = 0
//       orderedProducts.keys().forEach(pO => {
//         pOSubTotal += pO.price
//       })
//     order.total = pOSubTotal
//   } catch (err) {
//     console.error(err)
//   }
// }

// Order.beforeCreate(getSubTotal)
// Order.beforeUpdate(getSubTotal)

module.exports = Order
