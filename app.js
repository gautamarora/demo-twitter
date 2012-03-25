
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/twitterdb');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);

app.get('/adduser', routes.addUser);
app.get('/users', routes.showUsers);
app.get('/users/:username', routes.showUsersByUsername);
app.get('/user/:username1/follow/:username2', routes.index); //not implemented

app.get('/addtweet', routes.addTweet);
app.get('/tweets', routes.showTweets);
app.get('/tweets/:username', routes.showTweetsByUsername);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
