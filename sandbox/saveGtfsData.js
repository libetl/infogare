const readDumps = require('../src/core/gtfs/readDumps')
const fs = require('fs')

const before = process.hrtime()[0] * 1000000 + process.hrtime()[1] / 1000

readDumps([
    'https://ressources.data.sncf.com/explore/dataset/sncf-ter-gtfs/files/24e02fa969496e2caa5863a365c66ec2/download/',
    'https://ressources.data.sncf.com/explore/dataset/sncf-intercites-gtfs/files/ed829c967a0da1252f02baaf684db32c/download/',
    'https://ressources.data.sncf.com/explore/dataset/sncf-transilien-gtfs/files/023d3733775238ae2e431e3613812bae/download/'])
    .then(gtfs => {
        fs.writeFileSync('sandbox/gtfsdump.json',JSON.stringify(gtfs))
        const after = process.hrtime()[0] * 1000000 + process.hrtime()[1] / 1000
        console.log(`Saving dump took ${after - before}ns, ${Math.round((after - before) / 1000)}ms, ${Math.round((after - before) / 1000000)}s`)})
