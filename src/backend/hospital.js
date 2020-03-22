const DB = require('../db');
const {validationResult} = require('express-validator');
const moment = require('moment');

/**
 * Capacity backend
 */
class Hospital {
    /**
     * save bed capacity
     * @param {Request} req
     * @param {Response} res
     * @return {Response}
     */
    all(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const sql = 'SELECT id, name FROM hospitals;'
        return DB.query(sql)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => res.status(500).send({error}));
    }

}

module.exports = new Hospital();