const express = require('express');
const {check} = require('express-validator');
const app = express();

app.get('/test', (req, res) => {
    res.json({'Hello': World});
});


module.exports = app;
