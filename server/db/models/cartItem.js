const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = CartItem
