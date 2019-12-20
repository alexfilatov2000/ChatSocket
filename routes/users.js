const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');


let User =  require('../models/user');

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password2 === password) {



        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });


        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.redirect('/users/login')
                    }

                })
            })
        })
    } else {
        req.flash('danger', 'Passwords do not match');
        res.redirect('/users/register')
    }
});

router.get('/login', function (req, res) {
   res.render('login');

});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true })(req, res, next);

});

router.get('/logout', function (req, res) {
    session.myuser = 'incognito';
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login')

});
module.exports = router;
