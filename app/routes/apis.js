const express = require('express');
let app = express.Router();
const datas = require("../controllers/data.controller.js");

// APIS
app.post('/input', datas.create);
app.get('/find-data', datas.findPhoneNumber);
app.get('/get-data', datas.getAllData);
app.put('/update/:id', datas.update);
app.delete('/delete/:id', datas.delete);

module.exports = app