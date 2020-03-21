const express = require('express');
const {check} = require('express-validator');
const DB = require('../db');
const app = express();
const Capacity = require('../backend/capacity');

app.get('/test', async (req, res) => {

    const sql = "SELECT * FROM dbname.table_name;";
    await DB.query(sql, function(err, result) {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });

    res.json({'Hello': World});
});

app.post('/save', [
    check('totalBeds').isInt().trim().escape(),
    check('freeBeds').isInt().trim().escape(),
    check('totalIntensiveBeds').isInt().trim().escape(),
    check('freeIntensiveBeds').isInt().trim().escape()    
], Capacity.saveCapacity);


module.exports = app;
