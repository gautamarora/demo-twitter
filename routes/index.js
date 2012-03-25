var User = require('../models/user.js');
var Tweet = require('../models/tweet.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.addUser = function(req, res) {
  res.send('creating...');
  
  var user = new User();
  user.username = 'preeti';
  user.firstname = 'Preeti';
  user.lastname = 'Singh';
  user.location = 'Chicago';
  
  user.save(function(err) {
    if (!err) {
      return console.log("created!");
    } else {
      return console.log(err);
    }
  });
  
};


exports.showUsers = function(req,res) {
  res.send('fetching...');
  
  User.find(function(err,users) {
    if (!err) {
      return console.log(users);
    } else {
      return console.log(err);
    }
  });
}

exports.showUsersByUsername = function(req,res) {
  res.send('fetching...');
  
  User.findOne({username:req.params.username},function(err,user) {
    if (!err) {
      return console.log(user);
    } else {
      return console.log(err);
    }
  });
}



exports.addTweet = function(req, res) {
  res.send('creating tweet...');
  
  User.findOne({username:'preeti'},function(err,user) {
    if (!err) {
      console.log("found user...");
      var tweet = new Tweet();
      tweet.text = 'Goodbye';
      tweet.author = user._id;
      tweet.save(function(err) {
        if (!err) {
          return console.log("tweeted!");
        } else {
          return console.log(err);
        }
      });
      
    } else {
      return console.log(err);
    }
  });
};

exports.showTweets = function(req,res) {
    res.send('fetching...');
    
    Tweet.find(function(err,tweets) {
      if (!err) {
        return console.log(tweets);
      } else {
        return console.log(err);
      }
    });
};

exports.showTweetsByUsername = function(req,res) {
  res.send('fetching...');
  
  User.findOne({username:req.params.username},function(err,user) {
    if (!err) {
      //console.log(user);
      if(user) {
        Tweet.find({author:user._id},function(err,tweets) {
          if (!err) {
            return console.log(tweets);
          } else {
            return console.log(err);
          }
        });
      } else {
        console.log("no user found");
      }
    } else {
      return console.log(err);
    }
  });
}