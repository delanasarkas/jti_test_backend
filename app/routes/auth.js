const express = require('express');
let app = express.Router();

app.get('/', function (req, res) {
    res.render('auth/login');
});

module.exports = app