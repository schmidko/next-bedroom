//result
/*[
    [
        1, // hospital-id
        1000, //normal-bedrooms
        1000, //emergency-bedrooms
        12, //free-normal-bedrooms
        14, //free-emergency-bedrooms
        '2020-03-20' //timestamp
    ], 
    [ //...
    ] 
]*/

function generateBedData(id, normal_beds, emergency_beds) {
    var free_normal_beds = getRandomNumberBeds(normal_beds)
    var free_emergency_beds = getRandomNumberBeds(emergency_beds)
    const tmpArray = []
    for (let i = 0; i < 10; i++) {
        free_normal_beds = getRandomNumberBedsIncreasing(free_normal_beds, normal_beds);
        free_emergency_beds = getRandomNumberBedsIncreasing(free_emergency_beds, emergency_beds)
        tmpArray.push([id, normal_beds, emergency_beds, free_normal_beds, free_emergency_beds, generateDate(9-i)])
    }
    console.log(tmpArray)
    return tmpArray  
}

function generateDate(substract){
    return new Date(Date.now() - substract * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

function getRandomNumberBeds(bedrooms){
    return Math.round(((Math.random() * bedrooms) + 1) / 4)
}

function getRandomNumberBedsIncreasing(beds, limit){
    var x = beds + Math.round(Math.random() * beds * 0.4);
    return x < limit ? x : limit 
}