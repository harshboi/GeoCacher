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
mongoHost = 'classmongo.engr.oregonstate.edu';
mongoDBName = 'cs290_singhhar';
mongoPassword = 'cs290_singhhar';
// var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoURL = 'mongodb://' + 'cs290_singhhar' + ':' + 'cs290_singhhar' + '@' + 'classmongo.engr.oregonstate.edu' + ':' + mongoPort + '/' + 'cs290_singhhar';

// mongo --host classmongo.engr.oregonstate.edu --username cs290_singhhar cs290_singhhar --password
//mongo --host classmongo.engr.oregonstate.edu --username cs290_[ONID] cs290_[ONID] --password
// mongodb://cs290_singhhar:cs290_singhhar@classmongo.engr.oregonstate.edu:27017/cs290_singhhar
var mongoDBDatabase;
var db;

MongoClient.connect(mongoURL, function(err, client) {
  if (err) {
    throw err;
  }
  else {
  }
  db = mongoDBDatabase = client.db(mongoDBName);
  // console.log("db is: ", db)
  app.listen(3000, function () {
    console.log("== Server listening on port 3000");
  });
  retrieve_all_data();
});

function add_data (_name, _link, _author, _city, _state, _lat, _long) {
  var data = db.collection('location_data');
  data.insertOne({
    name: _name,
    link: _link,
    author:_author,
    city: _city,
    state: _state,
    lat: _lat,
    long: _long
  });
  // console.log("data is: ", data);
};

function retrieve_all_data () {
  var all_information = db.collection('location_data',function(err,client) {
    if(err) {
      throw err;
    }
    else {
      console.log ("Working");
    }
  });
  console.log("information is ", all_information.find({location:'Corvallis'}).toArray());
};

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.render('locationList', {
    locations: locationData
  });
});

app.get('/location/:n', function (req, res, next) { //Routing for place
  var locationName = req.params.n.toLowerCase();
  var locationsCollection = mongoDB.collection('/*name of collection*/');
  locationsCollection.find({ locationId: locationName }).toArray(function (err, locationDocs) {
    if (err) {
      res.status(500).send("Error fetching location from DB.");
    } else if (locationDocs.length > 0) {
      res.status(200).render('specificLocation', personDocs[0]);
    } else {
      next();
    }
  });
});

app.get('*', function (req, res, next) {
  res.status(404);
  res.render('404page');
});
