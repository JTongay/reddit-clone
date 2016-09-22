'use strict'

var express = require('express');
var app = express();

var enviornment = process.env.NODE_ENV || 'development';
var config = require('./knexfile')
var port = process.env.PORT || 3000;
var knex = require('knex')(config[enviornment]);
var ejs = require('ejs');

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('booyah');
})

app.get('/users', function (req, res) {
  knex('users').then(function (users){
    res.render('index', {users: JSON.stringify(users)});
  })
})

app.post('/users/new', function (req, res) {
  res.redirect('/users')
})

app.get('/users/:id', function (req, res) {
  var userID = req.params.id;
  res.render('users/single-user', {username: userID})
})

app.get('/users/:id/posts', function (req, res) {
  var userID = req.params.id;
  res.send("booyah")
})

app.get('/users/:id/comments', function (req, res) {
  var userID = req.params.id;
  res.render('comments/all-comments');
})

app.get('/posts', function (req, res) {
  res.send('booyah');
})

app.get('/posts/:id', function (req, res) {
  var userID = req.params.id;
  res.send('booyah');
})

app.get('/posts/:id/comments', function (req, res) {
  var userID = req.params.id;
  res.render('comments/all-comments');
})

app.get('/thank-you', function (req, res) {
  res.send("deez nutz")
})

app.listen(port, function() {
  console.log("listening on port: " + port);
})

module.exports = app;
