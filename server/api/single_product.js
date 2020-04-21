const router = require('express').Router()

const {Product} = require('../db/models/product')

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('No privileges')
    err.status = 401
    return next(err)
  }
  next()
}

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.productId,
      },
    })
    res.status(201).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
