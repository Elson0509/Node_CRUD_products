const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller.js')
const productController = require('../controllers/product.controller.js')

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/products', productController.findAll)

router.get('/categories', categoryController.findAll)

router.get("/categories/:categoryId", categoryController.find)

router.get('/login', (req, res)=> {res.render('login')})

router.get('/signup', (req, res)=> {res.render('signup')})
 

module.exports = router