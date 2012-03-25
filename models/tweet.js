var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Tweet = new Schema({
    text: { type: String, required: true }
  , author: { type: ObjectId, required: true }
  , date: { type: Date, default: Date.now }
  , replies: [Tweet]
  , retweets: [Tweet]
});


module.exports = mongoose.model('Tweet', Tweet);