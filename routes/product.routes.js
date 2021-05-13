const express = require('express')
const productController = require('../controllers/product.controller')
const fileUpload = require('../middleware/file-upload')
const router = express.Router()


router.get('/', productController.findAll)

router.get("/:productId", productController.find)

router.delete("/:productId", productController.remove)

router.post('/', productController.create)

router.post('/image/:productId', fileUpload.single('imageCat'), productController.saveImg)

router.put("/:productId", productController.update)

module.exports = router 