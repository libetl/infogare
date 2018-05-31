const readDumps = require('../src/core/gtfs/readDumps')
const awsSdk = require('aws-sdk')

const flatten = data => Array.isArray(data) ? data :
    typeof data !== 'object' ? data :
    Object.keys(data).filter(key => key.includes('_id')) > 0 ? data :
        Object.values(data).map (val => flatten(val))

readDumps([
    'https://ressources.data.sncf.com/explore/dataset/sncf-ter-gtfs/files/24e02fa969496e2caa5863a365c66ec2/download/',
    'https://ressources.data.sncf.com/explore/dataset/sncf-intercites-gtfs/files/ed829c967a0da1252f02baaf684db32c/download/',
    'https://ressources.data.sncf.com/explore/dataset/sncf-transilien-gtfs/files/023d3733775238ae2e431e3613812bae/download/'], {})
    .then(gtfs => Object.entries(gtfs).map(([key, value]) => ({[key]: flatten(value)}))
        .reduce((acc, value) => Object.assign(acc, value), {}))
    .then(flattenedGtfs => {debugger})
