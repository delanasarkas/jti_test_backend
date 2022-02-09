const express = require('express');
let app = express.Router();
const passport = require('passport');

app.get('/', function (req, res, next) {
    // CONDITION IF NOT LOGGEDIN
    const userSignIn = req.user;

    if(userSignIn) {
        // DECLARE DATA
        const data = {
            title: 'HOME',
            error: '',
            user: userSignIn,
        }
    
        // RESPONSE
        res.render('home/index', data);
    } else {
        res.redirect('/login');
    }
});

app.get('/input', function (req, res, next) {
    // DECLARE DATA
    const provider = [
        'XL',
        'TELKOMSEL',
        'THREE',
        'INDOSAT',
        'SMARTFREN',
    ]

    const data = {
        title: 'INPUT',
        provider:  provider,
    }

    // RESPONSE
    res.render('home/input', data);
});

app.get('/output', function (req, res, next) {
    // DECLARE DATA
    const data = {
        title: 'OUTPUT',
    }

    // RESPONSE
    res.render('home/output', data);
});

module.exports = app