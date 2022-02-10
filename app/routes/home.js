const express = require('express');
let app = express.Router();
const passport = require('passport');
const db = require("../models");
const crypto = require('../middleware/crypto');
const Data = db.data;

app.get('/', function (req, res, next) {
    // CONDITION IF NOT LOGGEDIN
    const userSignIn = req.user;

    if(userSignIn) {
        // DECLARE DATA
        const data = {
            title: 'HOME',
            error: '',
            user: userSignIn,
            provider: [],
        }
    
        // RESPONSE
        res.render('home/index', data);
    } else {
        res.redirect('/login');
    }
});

app.get('/input', function (req, res, next) {
    // DECLARE USER
    const userSignIn = req.user;

    if(userSignIn){
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
            user: userSignIn,
        }
    
        // RESPONSE
        res.render('home/input', data);
    } else {
        res.redirect('/login');
    }
});

app.get('/output', function (req, res, next) {
    // DECLARE USER
    const userSignIn = req.user;

    if(userSignIn){
        // GET ALL DATA
        Data.findAll()
        .then((data) => {
            // DECLARE DATA
            const provider = [
                'XL',
                'TELKOMSEL',
                'THREE',
                'INDOSAT',
                'SMARTFREN',
            ]

            const dataArr = {
                title: 'OUTPUT',
                data: data,
                cryptoGenerate: crypto,
                provider: provider,
            }

            // RESPONSE
            res.render('home/output', dataArr);
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = app