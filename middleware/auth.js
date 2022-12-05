module.exports = {
    kerkohetIdentifikimi: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        }
        else {
            res.redirect('/users/login')
        }

    },
    iIdentifikuar: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next()
        }
    },
    isAdmin: (req, res, next) => {
        user=req.user
        if (req.isAuthenticated() && req.user.userRole === "admin") {
            return next()
        }
        else{
            res.render('./errors/404',user)
        }
    }
}