const {timetable} = require('../src/core/gtfs/timetable')
const coloredStringifiedJson = require('./coloredStringifiedJson')
const gtfs = require('../sandbox/gtfsdump.json')
const places = require('../src/core/data/places')

const timestamp = () => {
    const hrTime = process.hrtime()
    return hrTime[0] * 1000000 + hrTime[1] / 1000
}
const timestamp1 = timestamp()
const result = timetable({gtfs, coordinates: places.melun, date:'20180304', time:'23:39:00'})
const timestamp2 = timestamp()
const readMs =  Math.trunc((timestamp2 - timestamp1) / 1000)
console.log(coloredStringifiedJson(result))
console.log(`Finding schedules took ${timestamp2 - timestamp1}ns.`)
console.log(`Finding schedules took ${readMs}ms.`)