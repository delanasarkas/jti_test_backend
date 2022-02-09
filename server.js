const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

// VIEW ENGINE EJS
app.set(
    'views', 
    './app/views'
);
app.set(
    'view engine',
    'ejs'
);

// ROUTE PAGE
const firstPage = require('./app/routes/auth')

// DECLARE PAGE
app.use('/',firstPage)

app.listen(PORT, () => {
    console.log('server running on port '+ PORT)
});