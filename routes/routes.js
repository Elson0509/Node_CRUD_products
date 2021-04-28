const express = require('express')
const categoryController = require('../controllers/Category.controller.js')
const router = express.Router()

router.get('/', (req, res) => {
    return res.send('Hello World');
})

router.get('/categories', categoryController.findAll)

router.get("/categories/:categoryId", categoryController.find)

router.delete("/categories/:categoryId", categoryController.remove)

router.post('/categories', categoryController.create)

router.put("/categories/:categoryId", categoryController.update)

module.exports = router