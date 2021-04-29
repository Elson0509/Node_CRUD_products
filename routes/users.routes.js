const express = require('express')
const userController = require('../controllers/user.controller')
const {check} = require('express-validator')
const router = express.Router()

const loginValidation = [check('username').isLength({min: 5, max: 50}), check('password').isLength({min: 6, max: 50})]

router.post('/signup', loginValidation, userController.signup)

router.post('/login', loginValidation, userController.login)

module.exports = router