'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ratingSchema = new Schema({
  artist: {type: Schema.Types.ObjectId, ref: 'Artist'},
  rater: {type: Schema.Types.ObjectId, ref: 'Rater'},
  song: Number,
  singing: Number,
  show: Number,
  looks: Number,
  clothes: Number
});

var rating = mongoose.model('Rating', ratingSchema);
