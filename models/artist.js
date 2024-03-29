'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var artistSchema = new Schema({
  name: String,
  songName: String,
  startNumber: Number,
  ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}]
});

var artist = mongoose.model('Artist', artistSchema);
