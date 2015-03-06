'use strict';
var hapi     = require('hapi'),
    mongoose = require('mongoose'),
    artist   = mongoose.model('Artist'),
    rating   = mongoose.model('Rating');

module.exports = function(server)
{
  server.route({
    method: 'OPTIONS',
    path: '/artists',
    handler: function (request, reply) {
      console.log('OPTIONS Request on: /artists');

      reply().header('Access-Control-Allow-Origin', '*').header('Access-Control-Allow-Methods', 'GET, OPTIONS').header('Access-Control-Allow-Headers', 'Authorization,content-type,x-requested-with');
    }
  });

  server.route({
    method: 'GET',
    path: '/artists',
    handler: function (request, reply) {
      console.log('GET Request on: /artists');

      var artists = artist.find().populate('ratings').exec(function (err, doc) {
        if (err) return console.error(err);

        artist.populate(doc, { path: 'ratings.rater', model: 'Rater' }, function(err, artistsWithRaters) {
          if (err) return console.error(err);

          reply({
            artists: artistsWithRaters
          }).header('Access-Control-Allow-Origin', '*');
        });
      });
    }
  });

  server.route({
    method: 'OPTIONS',
    path: '/artists/{id}',
    handler: function (request, reply) {
      console.log('OPTIONS Request on: /artists/%s', request.params.id);

      reply().header('Access-Control-Allow-Origin', '*').header('Access-Control-Allow-Methods', 'GET, OPTIONS').header('Access-Control-Allow-Headers', 'Authorization,content-type,x-requested-with');
    }
  });

  server.route({
    method: 'GET',
    path: '/artists/{id}',
    handler: function (request, reply) {
      console.log('GET Request on: /artists/%s', request.params.id);

      artist.findOne({ _id: request.params.id }).populate('ratings').exec(function (err, doc) {
        if (err) return console.error(err);

        artist.populate(doc, { path: 'ratings.rater', model: 'Rater' }, function(err, artistWithRaters) {
          if (err) return console.error(err);

          reply({
            artist: artistWithRaters
          }).header('Access-Control-Allow-Origin', '*');
        });
      });
    }
  });
};
