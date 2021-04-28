const express = require('express')
const categoryController = require('../controllers/Category.controller.js')
const router = express.Router()

router.get('/', (req, res) => {
    return res.send('Hello World');
})

router.get('/categories', categoryController.findAll)

router.get("/categories/:categoryId", categoryController.find);

router.post('/categories', categoryController.create)

module.exports = router