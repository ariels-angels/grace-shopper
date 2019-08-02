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

//this route can add items to the active cart.  CHANGE THIS SO THAT ITS FINDORCREATE AND MAKE IT WORK
router.post('/active', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        active: true
      }
    })
    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.productId
      }
    })
    if (!existingItem) {
      const newItem = await CartItem.create({
        cartId: cart.id,
        productId: req.body.productId,
        quantity: req.body.quantity
        // price: req.body.productPrice
      })
      res.json(newItem)
    } else {
      await existingItem.update({
        quantity: existingItem.quantity + req.body.quantity
      })
      res.json(existingItem)
    }
  } catch (error) {
    next(error)
  }
})

//this route will delete an item from a cart
router.put('/active/delete', async (req, res, next) => {
  try {
    console.log('req.body>>>>', req.body)
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        active: true
      }
    })
    const itemToDestroy = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.id
      }
    })
    await itemToDestroy.destroy()
    const updatedCart = await Cart.findOne({
      include: [{model: Product}],
      where: {
        userId: req.user.id,
        active: true
      }
    })
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})

//this route will update an item that is already in the cart.  When a user selects a new quantity, this route will edit the quantity in the db, and resend a whole new cart to rerender the carts page
router.put('/active', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        active: true
      }
    })
    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.productId
      }
    })
    await existingItem.update({
      quantity: req.body.quantity
    })
    const updatedCart = await Cart.findOne({
      include: [{model: Product}],
      where: {
        userId: req.user.id,
        active: true
      }
    })
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})
