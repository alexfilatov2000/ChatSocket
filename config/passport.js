const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const session = require('express-session');

module.exports = function (passport) {
    passport.use(new LocalStrategy(function (username, password, done) {
        //Match username
        let query = {username:username};
        User.findOne(query, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'User not found'});
            }

            //session.myuser = username;

            //Match password
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            })
        })
    }));
    passport.serializeUser(function(user, done) {
        console.log("serializeUser", user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

