const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderproduct', {
  quantity: {
    // might want to have a validation here
    type: Sequelize.INTEGER
  },
  price: {
    // fix
    type: Sequelize.FLOAT
  }
})

module.exports = OrderProduct
