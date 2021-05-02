const express = require('express')
const cors = require('cors')
const categoryRoutes = require('../routes/categories.routes')
const productRoutes = require('../routes/product.routes')
const userRoutes = require('../routes/users.routes')
const pagesRoutes = require('../routes/pages.routes')
const bodyParser = require('body-parser')
require('dotenv').config()
const checkAuth = require('../middleware/check-auth.js')
const checkTokenQuery = require('../middleware/check-token-query')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Alllw-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

//ejs as view engine
app.set('view engine', 'ejs')

//static folder
app.use(express.static('public'))

app.use(cors({
    origin: 'http://localhost'
}))

//routes
app.use(checkTokenQuery, pagesRoutes)
app.use(userRoutes)
app.use('/categories', checkAuth, categoryRoutes)
app.use('/products', checkAuth, productRoutes)


app.listen(process.env.PORT || 3333, ()=> {
    console.log('listening')
})