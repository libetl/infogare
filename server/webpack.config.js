const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './trainSchedulesServer.js',
    target: 'node',
    output: {
      filename: 'out/trainSchedulesServer.bin.js'
    },
    plugins: [
      new UglifyJsPlugin()
  ]
}
