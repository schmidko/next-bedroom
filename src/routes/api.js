const express = require('express');
const {check} = require('express-validator');
const app = express();

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


module.exports = app;
