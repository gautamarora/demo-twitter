var User = require('../models/user')
  , Tweet = require('../models/tweet')
  , routes = function(app) {
      return app.namespace('/tweets', function() {

        app.get('/', function(req,res) {
          res.send('fetching...');
          Tweet.find()
            .populate('user')
            .run(function(err,tweets) {
              if (!err) {
                return console.log(tweets);
              } else {
                return console.log(err);
              }          
          });
        });

        // curl -v -H "Content-Type: application/json" -X POST -d '{"user":{"username":"gautam"}, "tweet":{"text":"hello world"}}' http://localhost:3000/tweets
        app.post('/', function(req,res) {
          // console.log(req.body);return;
          res.send('creating tweet...');
          User.findOne({username:req.body.user.username},function(err,user) {
            if (!err) {
              console.log("found user...");
              var tweet = new Tweet();
              tweet.text = req.body.tweet.text;
              tweet.user = user._id;
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
        });
        
        app.get('/:username', function(req,res) {
          // res.send('fetching...');
          User.findOne({username:req.params.username},function(err,user) {
            if (!err) {
              //console.log(user);
              if(user) {
                Tweet.find({user:user._id})
                .populate('user')
                .run(function(err,tweets) {
                  if (!err) {
                    console.log(tweets);
                    return res.render('tweets/index',{locals: 
                      {
                        title: "Tweets"
                       ,tweets: tweets
                      }
                    });
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
      });
    })
  }
    
module.exports = routes;