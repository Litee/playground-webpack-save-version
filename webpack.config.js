const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const jsonfile = require('jsonfile')

module.exports = {
  entry: ['./src/index.js', './src/timestamp.txt'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/timestamp.txt',
      transform: function (content) {
        return new Date().toUTCString()
      }
    },
    {
      from: 'src/version.txt',
      transform: function (content) {
        const data = jsonfile.readFileSync('package.json')
        // BUILD_NUMBER is provided by TeamCity
        return data.version + '.' + (process.env.BUILD_NUMBER || 0).toString()
      }
    }])
  ]
}
