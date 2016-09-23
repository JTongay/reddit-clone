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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  res.send('booyah');
})

app.get('/users', function (req, res) {
  knex('users').then(function (users){
    res.render('index', {users: users});
  })
})

app.get('/users/new', function (req, res) {
  res.render('users/new-user')
})

app.post('/users', function (req, res) {
  console.log(req.body.username);
  knex('users').insert({username: req.body.username}).then(function (users){
    res.redirect('/users')

  })
})

app.get('/users/:id', function (req, res) {
  var userID = req.params.id;
  res.render('users/single-user', {username: userID})
})

app.get('/users/:id/posts', function (req, res) {
  var userID = req.params.id;
  knex('posts').then(function(posts){
      res.render("posts/threads", {posts: posts})
  })
})
app.get('/users/:id/posts/new', function (req, res) {
  var userID = req.params.id;
  res.send("booyah")
})

app.post('/users/:id/posts', function (req, res) {
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

app.get('/posts/:id/comments/new', function (req, res) {
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
