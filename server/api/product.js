const router = require('express').Router()
const isAdmin = require('./isAdmin')
const {Product, User, OrderProduct, Order} = require('../db/models')

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
    console.log('inside of server routes', req.params)
    const singleProduct = await Product.findOne({
      where: {id: req.params.productId}
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.productId
      }
    })
    res.status(201).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

module.exports = router
