const sortByTime = (departuresData) => [].concat.apply([], departuresData).sort((d1, d2) =>
    d1.stop_date_time.base_departure_date_time.localeCompare(d2.stop_date_time.base_departure_date_time))

const purify = obj => obj !== Object(obj) ? obj :
    Array.isArray(obj) ? obj.map(purify) :
        Object.entries(obj).reduce(
            (acc, [key, value]) => !value ? acc : Object.assign({}, acc, {[key]: purify(value)}), {})

const merged = (existingData, newData) => existingData.map(existingRow => {
    const addition = purify(newData.find(a => a.savedNumber === existingRow.savedNumber) || existingRow)
    return {
        ...addition,
        ...existingRow,
        dataToDisplay: {...existingRow.dataToDisplay, ...addition.dataToDisplay}
    }})

const combineAll = (departures, allAdditions) => allAdditions.reduce((partiallyMerged, additions) => merged(partiallyMerged, additions), departures)

const removeDuplicates = (departures) => departures.filter(departure => departures.find(departure2 => departure2.savedNumber === departure.savedNumber) === departure )

const feedWith = (sources, context) => Object.values(sources).map(source => source.feed || [])
        .reduce((acc, value) => acc.concat(value), [])
        .map(method => method.call(null, context))

const minimalMappingFor = (wantedDataSources, listOfDataSources) => {
    const sourcesSortedByImportance = wantedDataSources.sort((a, b) => 
        listOfDataSources[a].metadata.features.length < listOfDataSources[b].metadata.features.length)
    const firstSourceProvidingDepartures = sourcesSortedByImportance.find(source => listOfDataSources[source].metadata.features.includes('departures'))
    const sourcesWithoutImpossibleFeatureUse =
        sourcesSortedByImportance.filter(source => (listOfDataSources[source].feed||[]).length || source === firstSourceProvidingDepartures)
    const guess = sourcesWithoutImpossibleFeatureUse
       .reduce((acc, value) => {return {...listOfDataSources[value].metadata.features
           .map(feature => {return {[feature]: value}}).reduce((acc1, value1) => {return {...acc1, ...value1}}, {}), ...acc}}, {})
    return {...guess, stations:(listOfDataSources[guess.departures]||{}).stationSearch ? guess.departures : guess.stations || 'inMemory'}}

export {minimalMappingFor, combineAll, sortByTime, removeDuplicates, feedWith}
