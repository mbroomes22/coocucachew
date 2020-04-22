const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderproduct', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  }
})

module.exports = OrderProduct
