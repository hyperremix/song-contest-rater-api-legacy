'use strict';
var hapi     = require('hapi'),
    mongoose = require('mongoose'),
    artist   = mongoose.model('Artist');

module.exports = function(server)
{
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      console.log('GET Request on: /');

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
      console.log('GET Request on: /%d', request.params.startNumber);
      artist.findOne({ 'startNumber': request.params.startNumber }, function (err, artist) {
        if (err) return console.error(err);

        reply({
          artist: artist
        });
      });
    }
  });
};
