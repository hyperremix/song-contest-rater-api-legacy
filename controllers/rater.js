'use strict';
var hapi     = require('hapi'),
    joi      = require('joi'),
    mongoose = require('mongoose'),
    rater    = mongoose.model('Rater'),
    rating   = mongoose.model('Rating');

module.exports = function(server)
{
  server.route({
    method: 'GET',
    path: '/raters',
    handler: function (request, reply) {
      console.log('GET Request on: /raters');

      var raters = rater.find().populate('ratings').exec(function (err, raters) {
        if (err) return console.error(err);

        reply({
          raters: raters
        });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/raters/{id}',
    handler: function (request, reply) {
      console.log('GET Request on: /raters/%s', request.params.id);

      rater.findOne({ _id: request.params.id }).populate('ratings').exec(function (err, rater) {
        if (err) return console.error(err);

        reply({
          rater: rater
        });
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/raters',
    handler: function (request, reply) {
      console.log('POST Request on: /raters');

      var newRater = new rater(request.payload.rater);

      newRater.save(function (err, newRater) {
        if (err) return console.error(err);

        rater.ratings = [];

        reply({
          rater: newRater
        });
      });
    },
    config: {
      validate: {
        payload: {
          rater: {
            name: joi.string().required()
          }
        }
      }
    }
  });
};
