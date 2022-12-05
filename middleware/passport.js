const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const User = require('../models/user')


module.exports = function (passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' }, function (email, password, done) {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, { message: "Ky email nuk egziston" })
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return done(err)
                    }
                    if (res === false) {
                        return done(null, false, { message: "Kreditencialet jo te sakta" })
                    }
                    return done(null, user)
                })
            })
        }
    ))






    // para mbylljes se export vendos serializeuser dhe deserializeruser
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}