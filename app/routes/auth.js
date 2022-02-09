const express = require('express');
let app = express.Router();
const passport = require('passport');

app.get('/', function (req, res, next) {
    // DECLARE DATA
    const data = {
        title: 'LOGIN',
        error: ''
    }

    // RESPONSE
    res.render('auth/login', data);
});

app.get('/auth/google', 
    passport.authenticate(
        'google',
        {
            scope: [
                'email',
                'profile'
            ]
        }
    )
);

app.get('/auth/google/callback', 
    passport.authenticate(
        'google',
        {
            successRedirect: '/',
            failureRedirect: '/auth/failure'
        }
    )
);

app.get('/auth/failure', (req, res) => {
    // DECLARE DATA
    const data = {
        title: 'LOGIN',
        error: 'Login fail!'
    }

    // RESPONSE
    res.render('auth/login', data);
});

app.get('/auth/logout', (req, res) => {
    // LOGOUT
    req.logout();

    res.redirect('/login');
});

module.exports = app