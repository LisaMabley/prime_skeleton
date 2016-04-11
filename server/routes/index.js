var express = require('express');
var path = require('path');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skeleton');

var Lambicorn = mongoose.model('Lambicorn', {name:String});

router.post('/add', function(request, response, next) {
  var lamby = new Lambicorn({name: request.body.name});
  lamby.save(function(err) {
    if (err) console.log('blinks adorably %s', err);
    response.send(lamby.toJSON());
    next();
  });
});

router.get('/lambicorns', function(request, response, next) {
  return Lambicorn.find({}).exec(function(err, lambicorns) {
    if (err) throw new Error(err);
    response.send(JSON.stringify(lambicorns));
    next();
  });
});

router.get('/', function(request, response) {
  console.log('Router functioning');
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
