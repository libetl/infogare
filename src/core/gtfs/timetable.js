const capitalize = require('../operations/capitalize')
const {distance} = require('../operations/distance')
const haversine = require('../operations/haversine')
const moment = require('moment')

const computeDayOfWeek = (y, m, d) => {
    const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const y1 = m < 3 ? y - 1 : y
    return days[(y1 + Math.trunc(y1/4) - Math.trunc(y1/100) + Math.trunc(y1/400) + t [m - 1] + d) % 7]
}

const nearestTo = ({lat, long}, gtfs) => {
    const candidates = ((gtfs
        .stops_by_lat_long||[])[('' + Math.trunc(lat * 100)).padStart(5) + ',' + ('' + Math.trunc(long * 100)).padStart(5)]||[])
        .filter(station => station.parent_station)
    const closestStation = candidates.reduce((a, b) =>
            distance([long, lat], [a.stop_lon, a.stop_lat]) < distance([long, lat], [b.stop_lon, b.stop_lat]) ? a : b,
        candidates[0])
    const firstCandidates = candidates.filter(station =>
        station.stop_lon === closestStation.stop_lon && station.stop_lat === closestStation.stop_lat)
    const parents = candidates.map(station => station.parent_station ? gtfs.stops[station.parent_station] : null)
        .filter(station => station)
    return firstCandidates.concat(parents)
}

const timetable = ({gtfs, coordinates, stopPoints = nearestTo(coordinates, gtfs), date, time = '00:00:00',
                       delays = {stopPoints:{}, savedNumbers:{}}, dayOfWeek = computeDayOfWeek(parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)),
        parseInt(date.substring(6, 8)))}) => stopPoints.map(stopPoint =>
    (gtfs.stop_times_by_stop_id[stopPoint.stop_id]||[])
        .map(stopTime => Object.assign({stopTime}, {stopId: stopPoint.stop_id, trip:gtfs.trips[stopTime.trip_id]}))
        .map(stopTimeTrip => Object.assign(stopTimeTrip, {savedNumber: (stopTimeTrip.trip.trip_id||'').startsWith('DUASN') ?
                parseInt(stopTimeTrip.trip.trip_id.match(/^DUASN([0-9]+)/)[1]) :
                isNaN(stopTimeTrip.trip.trip_headsign) ? stopTimeTrip.trip.trip_id :
                    parseInt(stopTimeTrip.trip.trip_headsign)}))
        .map(stopTimeTrip => Object.assign(stopTimeTrip, {route:gtfs.routes[stopTimeTrip.trip.route_id]}))
        .map(stopTimeTripRoute=> Object.assign(stopTimeTripRoute, {agency:gtfs.agency[stopTimeTripRoute.route.agency_id]}))
        .map(stopTimeTripRouteAgency => Object.assign(stopTimeTripRouteAgency, {service:gtfs.calendar[stopTimeTripRouteAgency.trip.service_id]}))
        .map(stopTimeTripRouteAgencyService => Object.assign(stopTimeTripRouteAgencyService,
            {date:(gtfs.calendar_dates[date]||[])[stopTimeTripRouteAgencyService.trip.service_id]}))
        .map(stopTimeTripRouteAgencyServiceDate => Object.assign(stopTimeTripRouteAgencyServiceDate,
            {delays1: delays.stopPoints[
                    `${stopPoint.stop_id.replace(/StopPoint/, 'stop_point').replace(/:OCE/, ':OCE:SP:').replace(/\s/, '')}-${
                        stopTimeTripRouteAgencyServiceDate.savedNumber}`]}))
        .map(stopTimeTripRouteAgencyServiceDate => Object.assign(stopTimeTripRouteAgencyServiceDate,
            {delays2: delays.savedNumbers[stopTimeTripRouteAgencyServiceDate.savedNumber]}))
        .map(row => Object.assign(row, {stops:gtfs.stop_times_by_trip_id[row.stopTime.trip_id].map(stopTime =>
                Object.assign({stopTime}, {stop: gtfs.stops[stopTime.stop_id]}))}))
        .filter(row => row.service && (row.service.start_date.localeCompare(date) <= 0 &&
            row.service.end_date.localeCompare(date) >= 0 && row.service[dayOfWeek] === '1') &&
            (!row.date || row.date.exception_type !== '2') &&
            row.stopTime.arrival_time.localeCompare(time) >= 0)
        .sort((row1, row2) => row1.stopTime.arrival_time.localeCompare(row2.stopTime.arrival_time)))
    .reduce((acc, value) => acc.concat(value), [])

const asDeparturesData = gtfsResult => gtfsResult.map(gtfsDeparture => ({
    savedNumber: gtfsDeparture.savedNumber,
    stop_date_time: {
        base_departure_date_time: gtfsDeparture.stopTime.departure_time,
    },
    dataToDisplay: {
        mode: gtfsDeparture.agency.agency_name.startsWith('RER') ? 'RER' :
            gtfsDeparture.agency.agency_name.startsWith('La Verrière - La Défense') ? 'Transilien' :
                gtfsDeparture.agency.agency_name.startsWith('Paris') ? 'Transilien' : gtfsDeparture.agency.agency_name,
        name: gtfsDeparture.route.route_short_name,
        number: gtfsDeparture.trip.trip_headsign,
        status: (gtfsDeparture.delays1 || gtfsDeparture.delays2) &&
        (gtfsDeparture.delays1 || gtfsDeparture.delays2).data.severity.effect === 'NO_SERVICE' ? 'supprimé' :
            (gtfsDeparture.delays1 || gtfsDeparture.delays2) &&
            (gtfsDeparture.delays1 || gtfsDeparture.delays2).data.severity.effect === 'SIGNIFICANT_DELAYS' ? 'retardé' : '',
        delay: gtfsDeparture.delays1 && gtfsDeparture.delays1.data.severity.effect === 'SIGNIFICANT_DELAYS' ?
            moment(gtfsDeparture.delays1.timetableChange.amended_departure_time, 'HHmmss').format('HH:mm') : '',
        direction: capitalize(gtfsDeparture.stops.slice(-1)[0].stop.stop_name).replace(/^Gare De /, ''),
        time: `${('' + (parseInt(gtfsDeparture.stopTime.departure_time.split(':')[0]) % 24)).padStart(2, '0')}:${gtfsDeparture.stopTime.departure_time.split(':')[1]}`,
        stops: gtfsDeparture.stops.map(stopData => capitalize(stopData.stop.stop_name).replace(/^Gare De /, ''))}}))

const withGeolocation = (stationCoords, departures, sncfMaps) =>
    departures.map(departure =>  Object.assign(departure,
        {dataToDisplay: Object.assign(departure.dataToDisplay,
                {distance: sncfMaps[departure.savedNumber] &&
                    `< ${Math.ceil(haversine(stationCoords, sncfMaps[departure.savedNumber]))} km`})}))

module.exports = {nearestTo, timetable, asDeparturesData, withGeolocation}