var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Tweet = require('../models/tweet.js');

var User = new Schema({
    username: { type: String, required: true }
  , password: String
  , firstname: String
  , lastname: String
  , location: String
  , followers: [ObjectId]
});

module.exports = mongoose.model('User', User);
