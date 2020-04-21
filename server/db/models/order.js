const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    default: true
  }
})

module.exports = Order
