const fs = require('fs');
const moment = require('moment');
const DB = require('../src/db');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const percentage = (number, percentage) => {
    return Math.floor((number / 100) * percentage);
};

const genereateBeds = (id, normal_betten, intensiv_betten) => {

    const result = [];
    const startdate = moment();

    for (let i = 0; i < 7; i++) {

        const normal_bettenP = getRandomIntInclusive(1, 20),
            intensiv_bettenP = getRandomIntInclusive(1, 20);

        result.push([
            id,
            normal_betten,
            intensiv_betten,
            percentage(normal_betten, normal_bettenP),
            percentage(intensiv_betten, intensiv_bettenP),
            startdate.format('YYYY-MM-DD HH:mm:ss')
        ]);

        startdate.subtract(1, 'days');
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
