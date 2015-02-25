'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ratingSchema = new Schema({
  artist_id: [Schema.Types.ObjectId],
  rater_id: [Schema.Types.ObjectId],
  song: Number,
  singing: Number,
  show: Number,
  looks: Number,
  clothes: Number
});

var rating = mongoose.model('Rating', ratingSchema);
