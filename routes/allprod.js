const router = require('express').Router()


const{isAdmin}=require('../middleware/auth')







const {getAllProd} = require('../controllers/Product-Controllers')




router.get('/',isAdmin, getAllProd)










module.exports = router