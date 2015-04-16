var http = require('http')
var join = require('path').join
var express = require('express')
var cors = require('cors')
var ExpressPeerServer = require('peer').ExpressPeerServer

var app = express()
var server = require('http').Server(app)

var PORT = process.env.PORT || 3000

app.use(express.static(join(__dirname, 'build')))
app.use(cors())
app.use('/peers', ExpressPeerServer(server, { debug: process.env.NODE_ENV !== 'production' }))

app.use(require('./routes'))

if (!module.parent) {
  server.listen(PORT, function () {
    console.log('Server started on port ' + PORT)
  })
}

module.exports = server
