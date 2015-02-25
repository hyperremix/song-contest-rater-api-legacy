'use strict';
var hapi     = require('hapi'),
    joi      = require('joi'),
    mongoose = require('mongoose'),
    rating   = mongoose.model('Rating');

module.exports = function(server)
{
  server.route({
    method: 'GET',
    path: '/ratings',
    handler: function (request, reply) {
      console.log('GET Request on: /ratings');

      var ratings = rating.find(function (err, ratings) {
        if (err) return console.error(err);

        reply({
          ratings: ratings
        });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/ratings/{id*2}',
    handler: function (request, reply) {
      console.log('GET Request on: /ratings/', request.params.id);

      var idParts = request.params.id.split('/');

      rating.find({ artist_id: idParts[0], rater_id: idParts[1] }, function (err, ratings) {
        if (err) return console.error(err);

        reply({
          ratings: ratings
        });
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/ratings',
    handler: function (request, reply) {
      console.log('POST Request on: /ratings');

      var newrating = new rating(request.payload.rating);
       newrating.save(function (err, newrating) {
        if (err) return console.error(err);

        reply({
          rating: newrating
        });
      });
    },
    config: {
      validate: {
        payload: {
          rating: {
            artist_id: joi.string().required(),
            rater_id: joi.string().required(),
            song: joi.number().integer().max(15).default(0),
            singing: joi.number().integer().max(15).default(0),
            show: joi.number().integer().max(15).default(0),
            looks: joi.number().integer().max(15).default(0),
            clothes: joi.number().integer().max(15).default(0)
          }
        }
      }
    }
  });
};
