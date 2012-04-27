var mongoose          = require('mongoose')
  , Schema            = mongoose.Schema
  , ObjectId          = mongoose.SchemaTypes.ObjectId;

var TweetSchema = new Schema({
    text: { type: String, required: true }
  , user : { ref: 'User', type: Schema.ObjectId, required: true }
  , mentions: [{ ref:'Mention', type: ObjectId}]
  , retweets: [{ ref:'Retweet', type: ObjectId}]
  , date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Tweet', TweetSchema);