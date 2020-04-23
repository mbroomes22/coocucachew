const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    // when and how will we calculate this?
    type: Sequelize.INTEGER
  },
  isPending: {
    // isPending = true means that the order is incomplete
    type: Sequelize.BOOLEAN,
    default: true
  }
})

module.exports = Order
