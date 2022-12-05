const slugify = require('slugify')
const Category = require('../models/Category')
const Product = require('../models/Product')


module.exports = {
    getCategories: async (req, res) => {
        const user = req.user
        const categories = await Category.find({}).lean()
        res.render('categories/index', { categories,user})
    },
    getCreate: (req, res) => {
        const user = req.user
        res.render('categories/newcat',{user})
    },
    postCreate: async (req, res) => {
        try {
            const newCat = new Category({
                catName: req.body.catName,
                catDesc: req.body.catDesc,
                catSlug: slugify(req.body.catName),
                catImg: req.file.filename
            })
            const savedCat = await newCat.save()
            res.redirect('/categories')
        } catch (err) {
            console.log(err);
        }



    },
    getSingleCatPost: async (req, res) => {
        const user=req.user
        const catId = await Category.findById(req.params.id).lean()
        const prodCat = await Product.find({category:catId}).lean()
        res.render('categories/singlecat',{prodCat,catId,user})
    }
}