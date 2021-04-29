const express = require('express')
const cors = require('cors')
const categoryRoutes = require('../routes/categories.routes')
const productRoutes = require('../routes/product.routes')
const userRoutes = require('../routes/users.routes')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(cors({
    origin: 'http://localhost'
}))

//routes
app.use('/categories',categoryRoutes)
app.use('/products', productRoutes)
app.use(userRoutes)

app.listen(process.env.PORT || 3333, ()=> {
    console.log('listening')
})