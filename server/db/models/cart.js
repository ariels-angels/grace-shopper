const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
})

module.exports = Cart
