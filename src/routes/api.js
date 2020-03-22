const express = require('express');
const {check} = require('express-validator');
const DB = require('../db');
const app = express();
const Capacity = require('../backend/capacity');

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

app.post('/save', [
    check('totalBeds').isInt().trim().escape(),
    check('freeBeds').isInt().trim().escape(),
    check('totalIntensiveBeds').isInt().trim().escape(),
    check('freeIntensiveBeds').isInt().trim().escape()    
], Capacity.saveCapacity);

app.get('/all-hotspots', async (req, res) => {
    const q1 = DB.query(
        'SELECT a.name, b.id, b.geo_lat, b.geo_long, b.amount, b.timest ' +
        'FROM (SELECT name, MAX(timest) AS latest FROM hotspots '+
        '      GROUP BY name) AS a ' +
        'JOIN hotspots b ON b.name = a.name AND b.timest = a.latest '+
        'ORDER BY a.name;'
    );
    // const q1 = DB.query("SELECT * FROM bedroom.hotspots;");

    Promise.all([q1]).then((result) => {
        res.json({
            hotspots: result[0]
        });
    });
});
app.get('/all-beds', [
    check('limit').isInt().trim().escape(),
    check('offset').isInt().trim().escape() 
], Capacity.allBeds);
app.get('/all-trend', [
    check('limit').isInt().trim().escape(),
    check('offset').isInt().trim().escape() 
], Capacity.allTrend);


module.exports = app;
