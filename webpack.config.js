const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const jsonfile = require('jsonfile')

module.exports = {
  entry: ['./src/index.js', './src/timestamp.txt'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ['raw-loader']
      }
    ]
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
        return data.version
      }
    }])
  ]
}
