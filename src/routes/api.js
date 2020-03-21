const express = require('express');
const {check} = require('express-validator');
const DB = require('../db');
const app = express();

app.get('/all-hospitals', async (req, res) => {

    const q1 = DB.query("SELECT * FROM bedroom.hospitals;");
    const q2 = DB.query("SELECT * FROM bedroom.beds;");

    Promise.all([q1, q2]).then((result) => {
        res.json({
            hospitals: result[0].map((item, index) => {

                item.beds = result[1].filter((bed) => {
                    return bed.hospital_id === item.id
                });

                return item;
            })
        });
    });
});

app.get('/all-hotspots', async (req, res) => {

    const q1 = DB.query("SELECT * FROM bedroom.hotspots;");

    Promise.all([q1]).then((result) => {
        res.json({
            hotspots: result[0]
        });
    });
});

module.exports = app;
