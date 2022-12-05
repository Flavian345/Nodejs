// import Schemas

const User = require('../models/user')
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    getProducts: async (req, res, next) => {
        let perPage = 30
        let page = req.query.page || 1
        const user = req.user

        Product.find({})
            .populate('user')
            .sort({ createdAt: 'desc' })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, produktet) => {
                Product.countDocuments().exec((err, count) => {
                    if (err) return next(err)
                    res.render('products/index', {
                        produktet,
                        current: page,
                        user,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    },
    getCreateProduct: async (req, res) => {
        const user = req.user
        const categories = await Category.find({}).lean()
        res.render('products/create', { categories, user })

    },
    postCreateProduct: async (req, res) => {
        const { name, category, price, description } = req.body

        console.log(req.user);
        console.log(req.body);
        console.log(req.file);
        try {
            const newProd = new Product({
                name,
                category,
                price,
                description,
                image: req.file.filename,
                user: req.user._id,
                seller: req.user.username,
                numri: req.user.phone
            })
            const savedProd = await newProd.save()
            res.redirect('/users/profile?succes=true')
            console.log(savedProd);
        } catch (err) {
            console.log(err);
            res.redirect('/products/create?succes=false')
        }



    },
    getSingleProduct: async (req, res) => {
        const user = req.user
        const single = await Product.findById({ _id: req.params.id })
        res.render('products/singleproduct', { single, user })
   
    },
    getEditSingle: async (req, res) => {
        const user = req.user
        let produkti = await Product.findOne({ _id: req.params.id }).lean()
        if (!produkti) {
            return res.redirect('/')
        }
        if (produkti.user != req.user.id) {
            res.redirect('/')
        }
        else {
            res.render('products/edit', { prod: produkti, user })
        }
        console.log(produkti);
    },
    postEditSingle: async (req, res) => {
        try {
            const prodUpdate = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            }
            let prodId = {
                _id: req.params.id
            }
            const updateProd = await Product.findOneAndUpdate(prodId, prodUpdate)
            if (updateProd) {
                res.redirect('/users/profile?success=true')
            }
            else {
                res.redirect('/users/profile?success=false')
            }
        } catch (err) {
            console.log(err);
        }
    },
    postDeleteSingle: async (req, res, next) => {
        try {
            let produkti = await Product.findById(req.params.id).lean()

            if (!produkti) {
                res.redirect('/users/profile?success=false')
            }
            if (produkti.user != req.user.id) {
                res.redirect('/users/profile?success=false')
            }
            else {
                await Product.deleteOne({ _id: req.params.id })
                res.redirect('/users/profile?success=true')
            }
        } catch (err) {
            console.log(err);
            res.redirect('users/profile?success=false')
        }

    },
    getAllProd: (req, res) => {
        let perPage = 20
        let page = req.query.page || 1
        const user = req.user

        Product.find({})
            .populate('user')
            .sort({ createdAt: 'desc' })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, produktet) => {
                Product.countDocuments().exec((err, count) => {
                    if (err) return next(err)
                    res.render('products/allProducts', {
                        produktet,
                        current: page,
                        user,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    },
    getEditAdminSingle: async (req, res) => {
        let produkti = await Product.findOne({ _id: req.params.id}).lean()
        if (!produkti) {
            return res.redirect('/')
        }
        else {
            res.render('products/editAdminProducts', { prod: produkti })
        }
    },
    postAdminEditSingle: async (req, res) => {
        try {
            const prodUpdate = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            }
            let prodId = {
                _id: req.params.id
            }
            const updateProd = await Product.findOneAndUpdate(prodId, prodUpdate)
            if (updateProd) {
                res.redirect('/allproducts?success=true')
            }
            else {
                res.redirect('/allproducts?success=false')
            }
        } catch (err) {
            console.log(err);
        }
    },
    postAdminDeleteSingle: async (req, res, next) => {
        try {
            let produkti = await Product.findById(req.params.id).lean()

            if (!produkti) {
                res.redirect('/allproducts?success=false')
            }
            else {
                await Product.deleteOne({ _id: req.params.id })
                res.redirect('/allproducts?success=true')
            }
        } catch (err) {
            console.log(err);
            res.redirect('/allproducts?success=false')
        }

    },
    
    searchedProduct: async (req, res) => {
        let query = req.query.search;
        console.log(query);
        Product.find({
            $text: {
                $search: query,
            },
        },
            (err, newsearch) => {
                if (err) {
                    res.send('err')
                }
                else {
                    res.render('products/index', { produktet: newsearch })
                }

            }

        )

    }
}