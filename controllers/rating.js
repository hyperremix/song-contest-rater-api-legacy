'use strict';
var hapi     = require('hapi'),
    joi      = require('joi'),
    mongoose = require('mongoose'),
    artist   = mongoose.model('Artist'),
    rater    = mongoose.model('Rater'),
    rating   = mongoose.model('Rating');

module.exports = function(server)
{
  server.route({
    method: 'GET',
    path: '/ratings',
    handler: function (request, reply) {
      console.log('GET Request on: /ratings');

      var ratings = rating.find().populate('artist rater').exec(function (err, ratings) {
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

      rating.find({ artist: idParts[0], rater: idParts[1] }).populate('artist rater').exec(function (err, ratings) {
        if (err) return console.error(err);

        reply({
          ratings: ratings
        }).header('Access-Control-Allow-Origin', '*');
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/ratings',
    handler: function (request, reply) {
      console.log('POST Request on: /ratings');

      var newRating = new rating(request.payload.rating);
      newRating.save(function (err, newrating) {
        if (err) return console.error(err);

        var addToSet = { $addToSet: { ratings: newRating._id } };
        artist.update( { _id: mongoose.Types.ObjectId(request.payload.rating.artist) }, addToSet, function(err, numberAffected) {
          if (err) return console.log(err);
        });
        rater.update( { _id: mongoose.Types.ObjectId(request.payload.rating.rater) }, addToSet, function(err, numberAffected) {
          if (err) return console.log(err);
        });

        reply({
          rating: newRating
        }).header('Access-Control-Allow-Origin', '*');
      });
    },
    config: {
      validate: {
        payload: {
          rating: {
            artist: joi.string().required(),
            rater: joi.string().required(),
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
