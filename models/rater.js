'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var raterSchema = new Schema({
  name: String
})

var rater = mongoose.model('Rater', raterSchema);
