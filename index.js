var datauri = require('datauri')

var uri = datauri(__dirname + '/README.md')
console.log(uri)

var dep = require('./dep')
