var fs = require('fs');
var request = require('request');


var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");

var locationData = require('./locData');

var app = express();
var port = process.env.PORT || 3000;

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json());

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
  db = mongoDBDatabase = client.db(mongoDBName);
  // console.log("db is: ", db)
  app.listen(3001, function () {
    console.log("== Server listening on port 3000");
  });
  var temp = retrieve_all_data();
  setTimeout( function(){
    // console.log("Data load finished");
    // console.log("temp is: ",temp);
  },2000);
  // console.log("temp is: ",temp);
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
  var all_information = db.collection('location_data', function(err,client) {
    if(err) {
      throw err;
    }
    else {
      console.log ("Working ",client);
    }
  });

  var x = all_information.find({}).toArray( function (err, _data) {
    if(_data.length > 0) {
      console.log("DADADA", _data[0]);
      var zz = _data[0].comments;
      console.log(zz);
      // res.status(200).render()
      return _data;
    }
    else {
      console.log("ERROROROR");
    }
  });

  // while(x == undefined) {
    // console.log("INSIDE");
  // };

//   var y = x.count(function (err, num) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("Num is ", num);
//     return num;
// });

//   console.log("is ", y);
};


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  var n = req.params.n;
  var served = false;

  console.log("INSIDE LOCATION");

    var all_information = db.collection('location_data', function (err,client) {
      if(err) {
        throw err;
      }
      else {
        // console.log ("Working");
      }
    });

    var x = all_information.find({}).toArray( function (err, _data) {
      if(_data.length > 0) {
        // for(var i = 0; i < _data.length;i++){
        console.log("Inner working" + _data.length);
          var i = 1;
        // if(_data[i].link.toUpperCase() === n.toUpperCase()) {
          served = true;
          res.render('locationList', {
            locations: _data,
            // link: _data[i].link,
            // name: _data[i].name,
            // author: _data[i].author,
            // lat: _data[i].lat,
            // long: _data[i].long
            // description: _data[i].description,
            // comments: _data[i].comments
          });
        // }
      // }
        // return _data;
      }
      else {
        console.log("ERROROROR");
        throw err;
      }
    });

    // if(locationData[i].link.toUpperCase() === n.toUpperCase()) {
    //   served = true;
    //   res.render('placeView', {
    //     name: locationData[i].name,
    //     author: locationData[i].author,
    //     lat: locationData[i].lat,
    //     long: locationData[i].long,
    //     description: locationData[i].description,
    //     comments: locationData[i].comments
    //   });
    // }

  // if(!served) {
  //   next();
  // }
});

app.get('/:n', function (req, res, next) {
  var i = req.params.n;
  var served = false;
  var all_information = db.collection('location_data', function (err,client) {
    if(err) {
      throw err;
    }
    else {
      // console.log ("Working");
    }
  });

  var x = all_information.find({}).toArray( function (err, _data) {
    if(_data.length > 0) {
      var validity = 0;

      for(j = 0; j<_data.length; j++) {
        // console.log(_data[j].link.toLowerCase() + " " + i.toLowerCase());
        if(_data[j].link.toLowerCase() === i.toLowerCase()) {
          i = _data[j].num - 1;
          validity = 1;
          console.log("i is " + i);
          break;
        }
      }

      if(validity == 0) {
        console.log("Invalid");
        next();
      }
      else {
      // if(locationData[i].link.toUpperCase() === n.toUpperCase()) {
        served = true;
        res.render('placeView', {
          name: _data[i].name,
          author: _data[i].author,
          lat: locationData[i].lat,
          long: _data[i].long,
          description: _data[i].description,
          comments: _data[i].comments
        });
      }
    }
  });

  // if(!served) {
    // next();
  // }

});

app.get('*', function (req, res, next) {
  res.status(404);
  res.render('404page');
});

app.post('/new_location', function(req, res){
  //now req.body will be populated with the object you sent
  console.log(req.body.author); //prints john
});

app.post('/new_comment', function(req, res){
  //now req.body will be populated with the object you sent
  console.log(req.body.author); //prints john
});

app.listen(port, function () {
  // console.log("== Server is listening on port", port);
});

app.post('/people/:person/addPhoto', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (req.body && req.body.caption && req.body.photoURL) {
    var photo = {
      caption: req.body.caption,
      photoURL: req.body.photoURL
    };

    var myobj = { name: req.name, link : req.link, author : req.author, description : req.description, city : req.city, state : req.state, lat : req.lat, long : ret.long, comments : req.comments};
    db.collection("location_data").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });

  //   var peopleCollection = mongoDB.collection('people');
  //   peopleCollection.updateOne(
  //     { personId: person },
  //     { $push: { photos: photo } },
  //     function (err, result) {
  //       if (err) {
  //         res.status(500).send("Error inserting photo into DB.")
  //       } else {
  //         console.log("== mongo insert result:", result);
  //         if (result.matchedCount > 0) {
  //           res.status(200).end();
  //         } else {
  //           next();
  //         }
  //       }
  //     }
  //   );
    }
  // else {
  //   res.status(400).send("Request needs a JSON body with caption and photoURL.")
  // }
});
