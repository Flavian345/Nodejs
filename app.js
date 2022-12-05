const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const morgan = require('morgan')



const { isAdmin } = require('./middleware/auth')
// import Schemas
const User = require('./models/user')
const Product = require('./models/Product')
const Category = require('./models/Category')


// dotenv menjher pas importimit te moduleve

require('dotenv').config()


// Lidhja me databaze
const lidhuMeDb = require('./db')
lidhuMeDb()


//importojm routes

const userRoutes = require('./routes/users.js')
const categoryRoutes = require('./routes/categories')
const productRoutes = require('./routes/products')
const allProducts = require('./routes/allprod')



// inicializojm aplikacionin

const app = express()



// middleware
app.use(express.static('public'))
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))



// pasport middleware
require('./middleware/passport')(passport)
// session

app.use(session({
    secret: process.env.OUR_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL
    })
}))

app.use(passport.initialize());
app.use(passport.session());



// template engine
// folder i parapercaktuar eshte "views"
app.set('view engine', 'pug')




// routes 


// user routes http://localhost:5000/users
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)
app.use('/allProducts', allProducts)



app.get('/', async (req, res) => {
    const user = req.user
    const categories = await Category.find({}).lean()
    const numri_prod = await Product.find({}).lean()


    const produktet = await Product.find({})
        .sort({ createdAt: 'desc' })
        .limit(10)
        .lean()
    const isFeatured = await Product.find({ isFeatured: true })
        .sort({ createdAt: 'desc' })
        .limit(3)
        .lean()

    res.render('homepage', { products: produktet, isFeatured, categories, user, numri_prod })
})







PORT = process.env.PORT || 5001
app.listen(PORT)