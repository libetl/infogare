module.exports = storybookBaseConfig => Object.assign(storybookBaseConfig, {
    resolve:{
        modules: ['node_modules'],
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {
            'react-native': 'react-native-web'}}})