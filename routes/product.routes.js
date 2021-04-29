const express = require('express')
const productController = require('../controllers/product.controller')
const router = express.Router()


router.get('/', productController.findAll)

router.get("/:productId", productController.find)

router.delete("/:productId", productController.remove)

router.post('/', productController.create)

router.put("/:productId", productController.update)

module.exports = router 