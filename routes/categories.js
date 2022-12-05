const express=require('express')
const router=express.Router()

// import midlewares
const{isAdmin}=require('../middleware/auth')

// import from controllers

const{getCategories, getCreate, postCreate,getSingleCatPost}=require('../controllers/Category-Controllers')

// import multer from middleware

const{catUpload}=require('../middleware/multer')



// http://localhost:5000/categories
router.get('/',getCategories)

// krijimi i kategorive
// http://localhost:5000/categories/create

router.get('/create',isAdmin,getCreate)



// post kategory

router.post('/create',isAdmin,catUpload.single('catImg'),postCreate)



// single kategori
router.get('/:id',getSingleCatPost)


module.exports=router