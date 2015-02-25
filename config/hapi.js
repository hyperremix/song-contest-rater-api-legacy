'use strict';
var hapi = require('hapi'),
    fs   = require('fs'),
    path = require('path');

module.exports = function(server) {
  var modelsPath = path.join(__dirname, '../models');
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (/\.js$/.test(file)) {
      require(modelsPath + '/' + file);
    }
  });

  var controllersPath = path.join(__dirname, '../controllers');
  fs.readdirSync(controllersPath).forEach(function (file) {
    if (/\.js$/.test(file)) {
      require(controllersPath + '/' + file)(server);
    }
  });
};
