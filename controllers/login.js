'use strict';
var hapi     = require('hapi'),
    joi      = require('joi'),
    mongoose = require('mongoose'),
    basic    = require('hapi-auth-basic'),
    bcrypt   = require('bcryptjs'),
    rater    = mongoose.model('Rater');

module.exports = function(server)
{
  server.register(basic, function (err) {

      server.auth.strategy('default', 'basic', { validateFunc: validate });

      server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {
          console.log('GET Request on: /login');
          rater.findOne({name: request.auth.credentials.name}, function(err, rater) {
            if (err) return console.error(err);

            reply({
              rater: {
                _id: rater._id
              }
            }).header('Access-Control-Allow-Origin', '*');
          });
        },
        config: {
          auth: 'default'
        }
      });
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

var validate = function (name, password, callback) {
  rater.findOne({name: name}, function(err, rater) {
    if (err) return callback(null, false);

    bcrypt.compare(password, rater.password, function (err, isValid) {
        callback(err, isValid, { _id: rater._id, name: rater.name });
    });
  });
};
