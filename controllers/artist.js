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
          artists: artists
        });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/{id}',
    handler: function (request, reply) {
      console.log('GET Request on: /', request.params.id);
      artist.findOne({ _id: request.params.id }, function (err, artist) {
        if (err) return console.error(err);

        reply({
          artist: artist
        });
      });
    }
  });
};
