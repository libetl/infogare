import webservice from '../src/core'

test('mapping should work even without any data source', () => {
    expect(Object.values(webservice.minimalMappingFor([]))).toEqual(['inMemory'])
})

test('mapping should promote important sources', () => {
    expect(Object.values(webservice.minimalMappingFor(['nouveauSncf', 'horairesInfoTrafic']))).not.toContain('horairesInfoTrafic')    
})

test('mapping should hide impossible usage (sources where no feed is available and where departures is not used', () => {
    expect(Object.values(webservice.minimalMappingFor(['sncfApi', 'garesSncf', 'raildar']))).not.toContain('raildar')
})
