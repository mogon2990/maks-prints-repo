const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products/ --- all products
router.get('/', async (req, res, next) => {
  try {
    const products = Product.findAll({include: {all: true}})
    if (!products) { res.sendStatus(404) }
    res.json(products)
  }
  catch (err) { next(err) }
})

//GET /api/products/?query --- products in a category
router.get('/')

//GET /api/products/:id --- single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id)
    if (!product) { res.sendStatus(404) }
    res.json(product)
  }
  catch (err) { next(err) }
})

//   ---ADMIN ONLY---

//POST /api/products --- new product
router.post('/', async (req, res, next) => {

})

//PUT /api/products/:id --- edit product
router.put('/:id', async (req, res, next) => {

})

//DELETE /api/products/:id --- delete product
router.delete('/:id', async (req, res, next) => {

})
