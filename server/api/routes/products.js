const router = require('express').Router()
const {User, Product} = require('../../db/models')
const utils = require('./utils')
module.exports = router

//if you want only an admin to access something, then add utils.adminGateway, after '/',

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
