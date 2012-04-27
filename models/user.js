var mongoose          = require('mongoose')
  , Schema            = mongoose.Schema
  , ObjectId          = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({
    username: { type: String, required: true }
  , password: String
  , firstname: String
  , lastname: String
  , followers: [{ ref:'User', type: ObjectId}]
});

module.exports = mongoose.model('User', UserSchema);