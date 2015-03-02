'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var raterSchema = new Schema({
  name: String,
  password: String,
  ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}]
});

var rater = mongoose.model('Rater', raterSchema);
