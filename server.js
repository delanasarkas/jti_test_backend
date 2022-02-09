const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');

// REQUIRE OAUTH2
require('./app/middleware/ouath2');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;

// STATIC FILES
app.use(express.static(__dirname + '/public'));

// VIEW ENGINE EJS
app.use(expressLayouts);
app.set(
    'views', 
    './app/views'
);
app.set(
    'view engine',
    'ejs'
);

// SESSION
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: oneDay },
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTE PAGE
const homePage = require('./app/routes/home');
const authPage = require('./app/routes/auth');

// DECLARE PAGE
app.use('/', homePage)
app.use('/login', authPage)

app.listen(PORT, () => {
    console.log(`server running on port ${process.env.URI}`+ PORT)
});