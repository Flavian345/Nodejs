const multer = require('multer')


// foto e kategorive
var catStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/category')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})




// foto produkteve
var prodStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/products')
    },

    // fs

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})



var userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/user')
    },

    // fs

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})




var catUpload = multer({ storage: catStorage })
var prodUpload = multer({ storage: prodStorage })
var userUpload = multer({ storage: userStorage })





module.exports = {
    catUpload,
    prodUpload,
    userUpload
}