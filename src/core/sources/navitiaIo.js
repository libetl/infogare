import navitia from './clients/navitia'

export default navitia({hostname: 'https://api.navitia.io',
    metadata: {features:['stations', 'departures', 'colors', 'codes', 'journeys'], everywhere: true,
        betterServedWith: [], needsAuthentication: 'token',
        ratings:{relevancy: 5, reliability: 2, sustainability: 4, efficiency: 3}}})