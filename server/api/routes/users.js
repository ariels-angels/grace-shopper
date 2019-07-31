const router = require('express').Router()
const {User, Cart, CartItem, Product} = require('../../db/models')
const utils = require('./utils')
module.exports = router

router.get('/', utils.adminGateway, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/cart', utils.userGateway, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      include: [{model: Product}],
      where: {
        userId: req.params.id,
        active: true
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
