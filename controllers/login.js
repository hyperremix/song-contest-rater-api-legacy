'use strict';
var hapi     = require('hapi'),
    joi      = require('joi'),
    mongoose = require('mongoose'),
    bcrypt   = require('bcryptjs'),
    jwt      = require('jsonwebtoken'),
    boom     = require('boom'),
    rater    = mongoose.model('Rater');

module.exports = function(server)
{
  server.route({
    method: 'OPTIONS',
    path: '/token',
    handler: function (request, reply) {
      console.log('OPTIONS Request on: /token');

      reply().header('Access-Control-Allow-Origin', '*').header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD').header('Access-Control-Allow-Headers', 'content-type,x-requested-with,x-api-key,X-ACCOUNT-API-KEY,X-USER-API-KEY,account_api_key,user_api_key');
    }
  });

  server.route({
    method: 'POST',
    path: '/token',
    handler: function (request, reply) {
      console.log('POST Request on: /token');
      rater.findOne({name: request.payload.name}, function(err, doc) {
        if (err) return console.error(err);

        bcrypt.compare(request.payload.password, doc.password, function (err, result) {
          if (err) return console.error(err);

          if (!result) return reply(boom.unauthorized());

          var token = jwt.sign({ name: request.payload.name }, 'thisisnotsecret', { expiresInMinutes: 1440 });

          doc.token = token;
          doc.save(function (err, docWithNewToken) {
            if (err) console.error(err);
            reply({
              token: token
            }).header('Access-Control-Allow-Origin', '*');
          });
        });
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/register',
    handler: function (request, reply) {
      console.log('POST Request on: /register');

      bcrypt.hash(request.payload.rater.password, 8, function(err, hash) {
        if (err) return console.error(err);

        var newRater = new rater(request.payload.rater);

        newRater.ratings = [];
        newRater.password = hash;

        newRater.save(function (err, newRater) {
          if (err) return console.error(err);

          reply({
            rater: {
              _id: newRater._id
            }
          }).header('Access-Control-Allow-Origin', '*');
        });
      });
    },
    config: {
      validate: {
        payload: {
          rater: {
            name: joi.string().required(),
            password: joi.string().required()
          }
        }
      }
    }
  });
};
