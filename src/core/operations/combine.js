const sortByTime = (departuresData) => [].concat.apply([], departuresData).sort((d1, d2) =>
    d1.stop_date_time.base_departure_date_time.localeCompare(d2.stop_date_time.base_departure_date_time))

const merged = (existingData, newData) => existingData.map(existingRow => {
    const addition = newData.find(a => a.savedNumber === existingRow.savedNumber) || existingRow
    return {
        ...addition,
        ...existingRow,
        dataToDisplay: {...existingRow.dataToDisplay, ...addition.dataToDisplay}
    }})

const combineAll = (departures, allAdditions) => allAdditions.reduce((partiallyMerged, additions) => merged(partiallyMerged, additions), departures)

const removeDuplicates = (departures) => departures.filter(departure => departures.find(departure2 => departure2.savedNumber === departure.savedNumber) === departure )

const feedWithSources = (sources, context) => sources.map(source => source.feed)
                                                     .reduce((acc, value) => acc.concat(value), [])
                                                     .map(method => method.call(null, context))

export {combineAll, sortByTime, removeDuplicates, feedWithSources}
