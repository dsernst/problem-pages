var express = require('express')
var app = express()
var cool = require('cool-ascii-faces')

app.set('port', process.env.PORT || 5000)

app.get('/', function(req, res) {
  res.end('hello world')
})

app.get('/cool', function(req, res) {
  res.end(cool())
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
