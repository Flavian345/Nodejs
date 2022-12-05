
const router = require('express').Router()
const passport = require('passport')

// import controllers

const { getUsers,
  getRegister,
  postRegister,
  getLogin,
  getUserProfile,
  infoProfile,
  getEditProfile,
  postEditProfile,
  postDeleteProfile } = require('../controllers/user-Controllers')



//  http://localhost:5000/users



//http://localhost:5000/users
router.get('/', getUsers)







// http://localhost:5000/users/register

router.get('/register', getRegister)

// post regjister
router.post('/register', postRegister)


// login page

router.get('/login', getLogin)



// post login page

router.post('/login', passport.authenticate('local', {
  successRedirect: '/?succees=true',
  failureRedirect: '/users/login?succes=false',
}));



//  user profile
router.get('/profile', getUserProfile)



// logout user

router.get("/logout", function (req, res, next) {  
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
});


router.get("/infoProfile",infoProfile)

router.get("/editProfile/:id",getEditProfile)

// edit profile
router.post("/editProfile/:id",postEditProfile)


router.post('/deleteProfile/:id',postDeleteProfile)

module.exports = router