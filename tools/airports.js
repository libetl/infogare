const {get} = require('axios')
const fs = require('fs')

get('http://ourairports.com/data/airports.csv').then(({data}) =>
    data.split('\n')
        .map(row => row.split(',')
            .map(cell => (cell.startsWith('"') ? cell.slice(1, -1) : cell).replace(/\"/g, '')))
        .map(([id, ident, type, name, lat, long, elevation_ft, continent, 
            country, region, municipality, scheduledService, gpsCode, 
            iataCode, localCode, homeLink, wikipediaLink, keywords]) =>
            {return {intitule_gare: name, tvs: iataCode, 
                coordinates: [parseFloat(long), parseFloat(lat)]}})
        .filter(data => data.tvs))
    .then(data => fs.writeFileSync('src/core/data/airports.json', JSON.stringify(data)))
