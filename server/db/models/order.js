const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    // when and how will we calculate this?
    type: Sequelize.FLOAT // same situation as price on Product
  },
  isActive: {
    // isActive = true means that the order is incomplete
    // isPending? isProcessed? isComplete?
    type: Sequelize.BOOLEAN,
    default: true
  }
})

module.exports = Order
