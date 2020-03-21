const fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

readFiles('./hospitals/', (filename, content) => {

    JSON.parse(content).forEach((item) => {

        const name = item.name;
        const lat = item.geometry.location.lat;
        const lng = item.geometry.location.lng;

        console.log(`${name}, ${lat}, ${lng}`);
    });

});
