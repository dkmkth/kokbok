//Test via
//1. $mongod
//2. nodemon server.js

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
// Connection URL
var url = 'mongodb://localhost:27017/kokbok';
var db;
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})


//Adds recipe
app.post('/addRecipe', function (req, res) {

})

//Adds comment
app.post('/addComment', function (req, res) {

})

//Adds comment
app.post('/addReply', function (req, res) {

})

//Gets recipes
app.get('/', function (req, res) {

})
