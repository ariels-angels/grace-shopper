const router = require('express').Router()
const {Cart, CartItem, Product} = require('../../db/models')
const utils = require('./utils')
module.exports = router

router.get('/active', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      include: [{model: Product}],
      where: {
        userId: req.user.id,
        active: true
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/past', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{model: Product}],
      where: {
        userId: req.user.id,
        active: false
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/all', utils.adminGateway, async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{model: Product}]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/all/:id', utils.adminGateway, async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{model: Product}],
      where: {
        userId: req.params.id
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//this route can add items to the active cart
router.post('/active', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: 1,
        active: true
      }
    })
    const newItem = await CartItem.create({
      cartId: cart.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
      price: req.body.productPrice
    })
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

//this route will delete an item from a cart
router.delete('/active', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: 1,
        active: true
      }
    })
    const itemToDestroy = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.productId
      }
    })
    await itemToDestroy.destroy()
    const updatedCart = await Cart.findOne({
      include: [{model: Product}],
      where: {
        userId: 1,
        active: true
      }
    })
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})