'use strict';
var path     = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env      = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'api'
    },
    port: 3000,
    db: 'mongodb://localhost/test'
  },

  test: {
    root: rootPath,
    app: {
      name: 'api'
    },
    port: 3000,
    db: 'mongodb://localhost/api-test'

  },

  production: {
    root: rootPath,
    app: {
      name: 'api'
    },
    db: 'mongodb://GJAgKwgLcpDq:tplHGbGwAFSI@mongosoup-cont002.mongosoup.de:32219/cc_GJAgKwgLcpDq'
  }
};

module.exports = config[env];
