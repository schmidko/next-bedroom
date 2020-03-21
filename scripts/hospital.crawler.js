const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});
const cities = require('./german_cities');
const fs = require('fs');

const writeResultToFile = (name, result) => {
    const filename = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    fs.writeFile(`./hospitals/${filename}.json`, JSON.stringify(result), 'utf8', (error) => {
        console.error(error);
    });
};

cities.forEach((item) => {
    const name = item[0], lat = item[1], lng = item[2];

    client.placesNearby({
        params: {
            location: {lat, lng},
            radius: 50000,
            type: 'hospital',
            key: ''
        },
        timeout: 2000 // milliseconds
    }).then(r => {
        writeResultToFile(name, r.data.results);
        console.log(`Stadt: ${name}, Krankenhäuser: ${r.data.results.length}`)
    }).catch(e => {
        console.log(e);
    });
});
