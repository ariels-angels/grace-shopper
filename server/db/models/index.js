const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
/**
 * If we had any associations to make, this would be a great place to put them!
 * https://sequelize-guides.netlify.com/association-types/
 * ex. if we had another model called BlogPost, we might say:
//
// Puppy.belongsTo(Owner)
// BlogPost.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Product.belongsToMany(Cart, {through: 'cartItems'})
Cart.belongsToMany(Product, {through: 'cartItems'})
Cart.belongsTo(User)
User.hasMany(Cart)

module.exports = {
  db,
  User,
  Product,
  Cart
}
