const fs = require('fs');
const moment = require('moment');
const DB = require('../src/db');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genereateBeds = (id, normal_betten, intensiv_betten) => {

    const result = [];
    const startdate = moment();

    for (let i = 0; i < 30; i++) {
        startdate.subtract(1, 'days');
        result.push([
            id,
            normal_betten,
            intensiv_betten,
            normal_betten - getRandomIntInclusive(0, normal_betten),
            intensiv_betten - getRandomIntInclusive(0, intensiv_betten),
            startdate.format('YYYY-MM-DD HH:mm:ss')
        ]);
    }

    return result.join("\n");
};

// hole alle hospitals
const q1 = DB.query("SELECT * FROM bedroom.hospitals;");

Promise.all([q1]).then((result) => {

    const resultFinal = [];

    result[0].forEach((hospital) => {

        const normalBetten = getRandomIntInclusive(1000, 2000);
        const intensivBetten = getRandomIntInclusive(100, 500);

        resultFinal.push(genereateBeds(hospital.id, normalBetten, intensivBetten));
    });

    fs.writeFile('./beds.csv', resultFinal.join("\n"), 'utf8', (error) => {
        console.error(error);
    });
});
