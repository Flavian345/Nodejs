const bcrypt = require('bcrypt')



// importojm Schemas
const User = require('../models/user')
const Product = require('../models/Product')

module.exports = {
    getUsers: (req, res) => {
        res.redirect('/')
    },
    getRegister: (req, res) => {
        const user = req.user
        res.render('users/signup', user)
    },
    postRegister: async (req, res) => {
        const { username, phone, email, password } = req.body
  
        // kushte qe duhet te permbush nje perdorues per tu regjistruar

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            phone,
            email,
            password: hashPass
        })

        const savedUser = await newUser.save()

        res.redirect('/users/login')
    },
    getLogin: (req, res) => {
        const user = req.user
        res.render('users/signin', user)
    },
    getUserProfile: async (req, res, next) => {
        if (!req.user) {
            res.redirect('/users/login')
        }
        try {
            let perPage = 10
            let page = req.query.page || 1
            const user = req.user
            const numriP = Product.find({ user: req.user._id }).lean()
            const nrP = ((await numriP).length);
            const admin = req.user.userRole === "admin"


            Product.find({ user: req.user._id })
                .populate('user')
                .sort({ createdAt: 'desc' })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec((err, produktet) => {
                    Product.countDocuments().exec((err, count) => {
                        if (err) return next(err)
                        res.render('users/profile', {
                            produktet,
                            current: page,
                            user,
                            admin,
                            pages: Math.ceil(nrP / perPage)
                        })
                    })
                })
        } catch (err) {
            console.log(err);
        }
    },
    infoProfile: async (req, res) => {
        const user = req.user
        res.render('users/infoProFile', { user })
    },
    getEditProfile: async (req, res) => {
        const user = req.user
        let user1 = await User.findOne({ _id: req.params.id }).lean()
        if (!user) {
            res.redirect('/')
        }
        else if (user1._id != req.user.id) {
            res.redirect('/')
        }
        else {
            res.render('users/editProfile', { user1, user })
        }
    },
    postEditProfile: async (req, res) => {
        try {
            const profileUpdate = {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
            }
            let profileId = {
                _id: req.params.id
            }
            const updateProfile = await User.findOneAndUpdate(profileId, profileUpdate)
            if (updateProfile) {
                res.redirect('/users/profile?success=true')
            }
            else {
                res.redirect('/users/profile?success=false')
            }
        } catch (err) {
            console.log(err);
        }
    },
    postDeleteProfile: async (req, res, next) => {
        const user = req.user
        try {
            let user2 = await User.findById(req.params.id).lean()
            if (!user2) {
                res.redirect('/users/infoProfile?success=false1')
            }
            else if (user2._id != req.user.id) {
                res.redirect('/users/infoProfile?success=false2')
            }
            else {
                await User.deleteOne({ _id: req.params.id })
                res.redirect('/users/login?success=true')
            }
        } catch (err) {
            console.log(err);
            res.redirect('users/infoProfile?success=false3')
        }

    },


}