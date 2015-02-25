'use strict';
var hapi     = require('hapi'),
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

  //TODO: Change this request so that it filters ratings on artist_id and rater_id
  server.route({
    method: 'GET',
    path: '/ratings/{id}',
    handler: function (request, reply) {
      console.log('GET Request on: /ratings/', request.params.id);

      rating.findOne({ _id: request.params.id }, function (err, rating) {
        if (err) return console.error(err);

        reply({
          rating: rating
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
    }
  });
};
