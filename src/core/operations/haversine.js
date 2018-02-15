module.exports = (coords1, coords2) => {
    const degreesToRadian = Math.PI / 180;
    const latDelta = (coords2.lat - coords1.lat) * degreesToRadian
    const longDelta = (coords2.long - coords1.long) * degreesToRadian
    const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
        Math.cos(coords1.lat * degreesToRadian) * Math.cos(coords2.lat * degreesToRadian) *
        Math.sin(longDelta/2) * Math.sin(longDelta/2)
    return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}