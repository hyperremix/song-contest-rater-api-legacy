'use strict';
var hapi     = require('hapi'),
    config   = require('./config/config'),
    fs       = require('fs'),
    mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var server = new hapi.Server();
server.connection({ port: 3000 });

require('./config/hapi')(server)

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
