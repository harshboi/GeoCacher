var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var locationData = require('./locData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.render('locationList', {
    locations: locationData
  });
});

app.get('/location/:n', function (req, res, next) {
  // Display location n
});

app.get('*', function (req, res, next) {
  res.status(404);
  res.render('404page');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
