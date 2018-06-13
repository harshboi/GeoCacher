var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var locationData = require('./locData');

var app = express();
var port = process.env.PORT || 3000;

var MongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;
mongoUser = 'cs290_singhhar';
mongoHost = 'cs290cs290_singhhar';
mongoDBName = 'cs290_singhhar';
mongoPassword = 'cs290_singhhar';
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
// var mongoURL = 'mongodb://' + 'cs290_singhhar' + ':' + 'cs290_singhhar' + '@' + 'classmongo.engr.oregonstate.edu' + ':' + mongoPort + '/' + 'cs290_singhhar';
// mongo --host classmongo.engr.oregonstate.edu --username cs290_singhhar cs290_singhhar --password
//mongo --host classmongo.engr.oregonstate.edu --username cs290_[ONID] cs290_[ONID] --password
MongoClient.connect(mongoURL, function(err, client) {
  if (err) {
    throw err;
  }
  else {
    console.log("BOTIFUL");
  }
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.render('locationList', {
    locations: locationData
  });
});

app.get('/location/:n', function (req, res, next) { //Routing for place
  res.render('specificLocation', {

  })
});

app.get('*', function (req, res, next) {
  res.status(404);
  res.render('404page');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
