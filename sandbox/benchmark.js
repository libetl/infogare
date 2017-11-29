const benchmark = ({theContestants, howManyTimes, forThisWork, barSettings, asText, logInConsole, seedInit}) => {
    const timestamp = () => {
        const hrTime = process.hrtime();
        return hrTime[0] * 1000000 + hrTime[1] / 1000
    }
    const asNumbers = (name, duration) => `[${name.padStart(20)}]: ${`${(duration).toFixed(5)}`.padStart(15)} µs, ${`${((duration) / 1000).toFixed(0)}`.padStart(5)} ms, ${`${((duration) / 1000000).toFixed(2)}`.padStart(5)} s`

    const asBar = (between0And1, histogramDisplay = barSettings) => {
        const peak = between0And1 * histogramDisplay.width
        const interval = histogramDisplay.width / histogramDisplay.gradient.length
        return histogramDisplay.gradient.map(color => {return {color,
            threshold: histogramDisplay.gradient.indexOf(color) / histogramDisplay.gradient.length * histogramDisplay.width
        }}).filter(oneLevel => oneLevel.threshold <= peak)
            .map(oneLevel => oneLevel.color + (new Array(Math.min(Math.round(peak - oneLevel.threshold), interval)).fill(' ').join('')) + '\x1B[0m').join('')}

    const measureThemAll = (contestants, {howManyTimes, forThisWork}) => {
        const generatedSeeds = new Array(howManyTimes).fill(0).map(x => seedInit ? seedInit() : {})
        return new Array(howManyTimes)
            .fill(Object.entries(contestants))
            .reduce((acc, value) => acc.concat(value), [])
            .map(([name, contestant]) =>
                previouslyFoundData => Promise.resolve(timestamp()).then(startTime =>
                    new Promise(resolve => resolve(forThisWork(contestant, (generatedSeeds[(previouslyFoundData[name]||[]).length]))))
                        .catch(e => console.error(`[${name.padStart(20)}]: ERROR (${e})`))
                        .then(() => timestamp())
                        .then(endTime => Promise.resolve({
                            ...previouslyFoundData,
                            [name]: [...(previouslyFoundData[name] || []), endTime - startTime].sort()
                        }))))
            .reduce((acc, value) => acc.then(value), Promise.resolve({}))
            .then(data => Object.entries(data).map(([key, value]) => {
                return {[key]: value[Math.round(howManyTimes / 2)]}
            }).reduce((acc, value) => {
                return {...acc, ...value}
            }))}
    const outputTheResultsAsHistogram = data => !asText ? data : Object.entries(data).sort((a, b) => a[1] - b[1])
        .map(([name, duration], i, data) => asNumbers(name, duration) + ' ' + asBar(duration / data[data.length - 1][1]))
        .join('\n')
    const logThat = data => !logInConsole ? data : console.log(data)

    //ok, now that we are ready :
    return measureThemAll(theContestants, {howManyTimes, forThisWork}).then(outputTheResultsAsHistogram).then(logThat)
}

export {benchmark}