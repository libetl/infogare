const preventLineBreaks = text => !text ? text : text.replace(/ /g, '\u00a0').replace(/-/g, '\u2011').replace(/\//g, '\u00a0\u00a0\u00a0\u0338')

const format = departures =>
    departures.map(departure => departure.dataToDisplay).map(row => {return {
        ...row,
        direction: preventLineBreaks(row.direction),
        stops: !row.stops ? undefined : row.stops.map(stop => preventLineBreaks(stop))
    }})

export {format}