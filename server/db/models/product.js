const Sequelize = require('sequelize')
const db = require('../db')
const ProductCategory = require('./product_category')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    // look into getters/setters/class/instance methods/hooks
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true
    },
    get() {
      return '$' + this.getDataValue('price')
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    },
    defaultValue:
      'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product
