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

}

module.exports = new Capacity();