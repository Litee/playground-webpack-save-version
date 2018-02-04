const semver = require('semver')
const jsonfile = require('jsonfile')

const data = jsonfile.readFileSync('package.json')
const newVersion = semver.major(data.version) + '.' + semver.minor(data.version) + '.' + (process.env.BUILD_NUMBER || 0)
data.version = newVersion
jsonfile.writeFileSync('package.json', data, {spaces: 2})
