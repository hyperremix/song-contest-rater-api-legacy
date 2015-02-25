'use strict';
var hapi     = require('hapi'),
    config   = require('./config'),
    mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var server = new hapi.Server();
server.connection({ port: 3000 });

var artistSchema = mongoose.Schema({
  name: String,
  songName: String,
  startNumber: Number
})

var artist = mongoose.model('Artist', artistSchema)

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    var artists = artist.find(function (err, artists) {
      if (err) return console.error(err);

      reply({
        title: 'Scoreboard',
        artists: artists
      });
    });
  }
});

server.route({
  method: 'GET',
  path: '/{startNumber}',
  handler: function (request, reply) {
    console.log(request.params.startNumber);
    artist.findOne({ 'StartNumber': request.params.startNumber }, function (err, artist) {
      if (err) return console.error(err);

      reply({
        artist: artist
      });
    });
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
