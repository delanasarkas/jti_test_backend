const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const cors = require('cors');
const bodyparser = require("body-parser");

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

// CORS & BODY PARSER API
const corsOptions = {
    origin: process.env.URI+PORT
};
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

// DATABASE CONFIG
const db = require("./app/models");
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// ROUTE PAGE
const homePage = require('./app/routes/home');
const authPage = require('./app/routes/auth');
const apis = require('./app/routes/apis');

// DECLARE PAGE
app.use('/', homePage)
app.use('/login', authPage)
app.use('/api', apis)

app.listen(PORT, () => {
    console.log(`server running on port ${process.env.URI}`+ PORT)
});