import App from '../src/App'
import React from 'react'
import webservice from '../src/core'

provideData = () => {
    const data = {}
    Object.assign(data, {state:{dataSources:[], allDataSourcesMetadata:webservice.dataSources},
        setState:newData => data.state = {dataSources:newData.dataSources,
            allDataSourcesMetadata:webservice.dataSources},
        onDataSourceListChange:App.prototype.onDataSourceListChange})
    return data
}

test('enabling a shadowing data source would disable the first one', () => {
    const data = provideData()
    return data.onDataSourceListChange('terSncf', true).then(() =>
        data.onDataSourceListChange('inMemory', true)).then(() =>
        data.onDataSourceListChange('liveMap', true)).then(() =>
        data.onDataSourceListChange('nouveauSncf', true)).then(() =>
        expect(data.state.dataSources).toHaveLength(3))
})

test('but combine operation is still allowed', () => {
    const data = provideData()
    return data.onDataSourceListChange('sncfApi', true).then(() =>
        data.onDataSourceListChange('garesSncf', true)).then(() =>
        data.onDataSourceListChange('liveMap', true)).then(() =>
            expect(data.state.dataSources).toHaveLength(3))
})

test('a useless source will not be added', () => {
    const data = provideData()
    return data.onDataSourceListChange('sncfApi', true).then(() =>
        data.onDataSourceListChange('inMemory', true)).then(() =>
        data.onDataSourceListChange('garesSncf', true)).then(() =>
        data.onDataSourceListChange('liveMap', true)).then(() =>
        expect(data.state.dataSources).toHaveLength(3))
})

test('unless if a source becomes useful afterwards', () => {
    const data = provideData()
    return data.onDataSourceListChange('sncfApi', true).then(() =>
        data.onDataSourceListChange('inMemory', true)).then(() =>
        data.onDataSourceListChange('garesSncf', true)).then(() =>
        data.onDataSourceListChange('liveMap', true)).then(() => {

        // no inMemory
        expect(data.state.dataSources).toEqual(['sncfApi', 'garesSncf', 'liveMap'])

        return data.onDataSourceListChange('sncfApi', false)}).then(() =>
        data.onDataSourceListChange('nouveauSncf', true)).then(() =>
        data.onDataSourceListChange('inMemory', true)).then(() =>

        // inMemory allowed this time
        expect(data.state.dataSources).toEqual(['nouveauSncf', 'inMemory', 'liveMap']))
})

test('adding a source will simply add a new Source', () => {
    const data = provideData()
    data.onDataSourceListChange('inMemory', true).then(() =>
        data.onDataSourceListChange('liveMap', true)).then(() =>
        data.onDataSourceListChange('nouveauSncf', true)).then(() =>
        expect(data.state.dataSources).toHaveLength(3))
})


test('removing a source will do the job if possible', () => {
    const data = provideData()
    data.onDataSourceListChange('inMemory', false).then(() =>
        data.onDataSourceListChange('liveMap', false)).then(() =>
        data.onDataSourceListChange('nouveauSncf', true)).then(() =>
        expect(data.state.dataSources).toHaveLength(1))
})
