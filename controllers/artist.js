'use strict';
var hapi     = require('hapi'),
    mongoose = require('mongoose'),
    artist   = mongoose.model('Artist'),
    rating   = mongoose.model('Rating');

module.exports = function(server)
{
  server.route({
    method: 'GET',
    path: '/artists',
    handler: function (request, reply) {
      console.log('GET Request on: /artists');

      var artists = artist.find().populate('ratings').exec(function (err, artists) {
        if (err) return console.error(err);

        reply({
          artists: artists
        }).header('Access-Control-Allow-Origin', '*');
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/artists/{id}',
    handler: function (request, reply) {
      console.log('GET Request on: /artists/%s', request.params.id);

      artist.findOne({ _id: request.params.id }).populate('ratings').exec(function (err, artist) {
        if (err) return console.error(err);

        reply({
          artist: artist
        });
      });
    }
  });
};
