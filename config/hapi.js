'use strict';
var hapi   = require('hapi'),
    fs     = require('fs'),
    jwt    = require('jsonwebtoken'),
    path   = require('path');

module.exports = function(server) {
  var modelsPath = path.join(__dirname, '../models');
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (/\.js$/.test(file)) {
      require(modelsPath + '/' + file);
    }
  });

  server.register(require('hapi-auth-bearer-simple'), function (err) {
    if (err) throw err;

    server.auth.strategy('bearer', 'bearerAuth', {
      validateFunction: validate
    });
  });

  var controllersPath = path.join(__dirname, '../controllers');
  fs.readdirSync(controllersPath).forEach(function (file) {
    if (/\.js$/.test(file)) {
      require(controllersPath + '/' + file)(server);
    }
  });
};

var validate = function (token, callback) {
  var rater = mongoose.model('Rater');

  jwt.verify(token, 'thisisnotsecret', function(err, decoded) {
    if (err) return callback(null, false, null);

    rater.findOne({name: decoded.name}, function(err, rater) {
      if (err) return callback(null, false, null);

      return callback(null, true, { name: rater.name });
    });
  });
};
