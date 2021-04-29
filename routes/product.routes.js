const express = require('express')
const productController = require('../controllers/product.controller')
const router = express.Router()


router.get('/products', productController.findAll)

router.get("/products/:productId", productController.find)

router.delete("/products/:productId", productController.remove)

router.post('/products', productController.create)

router.put("/products/:productId", productController.update)

module.exports = router 