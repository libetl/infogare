import navitia from './clients/navitia'

export default navitia({hostname: 'https://api.sncf.com', coverage: 'sncf',
    metadata: {features:['stations', 'departures', 'colors', 'codes', 'journeys'], everywhere: true,
        betterServedWith: ['inMemory', 'garesSncf', 'liveMap'], needsAuthentication: 'token',
        ratings:{relevancy: 2, reliability: 5, sustainability: 4, efficiency: 4}}})
