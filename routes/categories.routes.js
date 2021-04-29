const express = require('express')
const categoryController = require('../controllers/category.controller.js')
const router = express.Router()

router.get('/', categoryController.findAll)

router.get("/:categoryId", categoryController.find)

router.delete("/:categoryId", categoryController.remove)

router.post('/', categoryController.create)

router.put("/:categoryId", categoryController.update)

module.exports = router