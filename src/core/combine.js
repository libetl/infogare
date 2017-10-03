export default (departures, additions) => departures.map(departure => {
        const addition = additions.find(a => a.savedNumber === departure.savedNumber) || departure
        return {
            ...addition,
            ...departure,
            dataToDisplay: {...departure.dataToDisplay, ...addition.dataToDisplay}
    }})
