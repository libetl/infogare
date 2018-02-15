const distance = ([long1, lat1], [long2, lat2]) => Math.sqrt(Math.pow(long2 - long1, 2) + Math.pow(lat2 - lat1, 2))

const distanceBetween = (station1, station2) =>
    distance([station1.coordinates[1], station1.coordinates[0]],
        station2.coordinates ? [station2.coordinates[1], station2.coordinates[0]] :
            [-station1.coordinates[1], -station1.coordinates[0]])

module.exports = {distance, distanceBetween}