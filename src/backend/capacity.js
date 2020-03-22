const DB = require('../db');
const {validationResult} = require('express-validator');
const moment = require('moment');

/**
 * Capacity backend
 */
class Capacity {
    /**
     * save bed capacity
     * @param {Request} req
     * @param {Response} res
     * @return {Response}
     */
    saveCapacity(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const {totalBeds, freeBeds, totalIntensiveBeds, freeIntensiveBeds} = req.body;

        // TODO set hospital id from user
        const hospitalCode = 1;

        const current = moment.utc().format('YYYY-MM-DD HH:mm.ss.S');
        const queryInsert = "INSERT INTO beds " +
            "(hospital_id, beds_normal_gesamt, beds_normal_free, beds_intensiv_gesamt, beds_intensiv_free, timest) VALUES " +
            `(${hospitalCode}, ${totalBeds}, ${freeBeds}, ${totalIntensiveBeds}, ${freeIntensiveBeds}, "${current}");`;

        return DB.query(queryInsert)
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => res.status(500).send({error}));
    }

    /**
     * get bed capacity
     * @param {Request} req
     * @param {Response} res
     * @return {Response}
     */
    allBeds(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const sql = 
            'SELECT i.hospital_id, b.beds_normal_gesamt, b.beds_intensiv_gesamt,'+
            '       b.beds_normal_free, b.beds_intensiv_free, b.timest '+
            'FROM (SELECT hospital_id, MAX(timest) AS latest FROM beds '+
            '      GROUP BY hospital_id) AS i ' +
            'JOIN beds b ON b.hospital_id = i.hospital_id AND b.timest = i.latest '+
            'ORDER BY i.hospital_id;';

        return DB.query(sql)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => res.status(500).send({error}));
    }
    /**
     * get daily trend of bed capacity
     * @param {Request} req
     * @param {Response} res
     * @return {Response}
     */
    allTrend(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const sql = 
            "SELECT " +  
            "    sum(beds_intensiv_free) as beds_intensiv_free , " +
            "    sum(beds_intensiv_gesamt) as beds_intensiv_gesamt, " +
            "    sum(beds_normal_free) as beds_normal_free , " +
            "    sum(beds_normal_gesamt) as beds_normal_gesamt, " +
            "    timest " +
            "FROM bedroom.beds " +
            "GROUP BY timest ORDER BY timest;";

        return DB.query(sql)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => res.status(500).send({error}));
    }

}

module.exports = new Capacity();