
const router=require('express').Router()
// import multer middleware
const {prodUpload}=require('../middleware/multer')
const {kerkohetIdentifikimi}=require('../middleware/auth')
const{isAdmin}=require('../middleware/auth')
// http://localhost:5000/products


// import controllers
const {getProducts,
    getCreateProduct,
    postCreateProduct,
    getSingleProduct,
    getEditSingle,
    postEditSingle,
    postDeleteSingle,
    searchedProduct,
    getEditAdminSingle,
    postAdminEditSingle,
    postAdminDeleteSingle
}=require('../controllers/Product-Controllers')

// search produktet

router.get('/search',searchedProduct)

// te gjitha produktet
router.get('/',getProducts)


// krijimi produktit
router.get('/create',kerkohetIdentifikimi,getCreateProduct)


// post product
router.post('/create', prodUpload.single('image'),postCreateProduct)


// single product
router.get('/:id',getSingleProduct)

// edit single product
router.get('/edit/:id',getEditSingle)



// post single prod
router.post('/edit/:id',postEditSingle)

// delete single product
router.post('/delete/:id',postDeleteSingle)







// admin edit
router.get('/editProdAdmin/:id',isAdmin, getEditAdminSingle)
router.post('/editProdAdmin/:id',postAdminEditSingle)
router.post('/deleteProdAdmin/:id',postAdminDeleteSingle)








module.exports=router