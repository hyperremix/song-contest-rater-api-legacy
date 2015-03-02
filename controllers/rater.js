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

      var raters = rater.find().populate('ratings').exec(function (err, doc) {
        if (err) return console.error(err);

        rater.populate(doc, { path: 'ratings.artist', model: 'Artist' }, function(err, ratersWithArtists) {
          if (err) return console.error(err);

          reply({
            raters: ratersWithArtists
          }).header('Access-Control-Allow-Origin', '*');
        });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/raters/{id}',
    handler: function (request, reply) {
      console.log('GET Request on: /raters/%s', request.params.id);

      rater.findOne({ _id: request.params.id }).populate('ratings').exec(function (err, doc) {
        if (err) return console.error(err);

        rater.populate(doc, { path: 'ratings.artist', model: 'Artist' }, function(err, raterWithArtists) {
          if (err) return console.error(err);

          reply({
            rater: raterWithArtists
          }).header('Access-Control-Allow-Origin', '*');
        });
      });
    }
  });
};
