const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, './config/.env')
});

/**
 * create a pool for mysql connections
 * @return {object} pool
 */
function createPool() {

    let mysql = require('mysql');
    let util = require('util');
    let pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        multipleStatements: true,
        debug: false
    });

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }

        if (connection) {
            connection.release();
        }
    });

    // Promisify for Node.js async/await.
    pool.query = util.promisify(pool.query);
    return pool;
}

module.exports = createPool();
