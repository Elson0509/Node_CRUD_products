const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller.js')

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/categories', categoryController.findAll)

router.get("/categories/:categoryId", categoryController.find)

router.get('/login', (req, res)=> {res.render('login')})
 

module.exports = router