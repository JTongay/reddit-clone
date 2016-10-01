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
  knex('users').where({id: userID}).first().then(function(users){
    // console.log(users);
    res.render('users/single-user', {users: users, userID: userID})
  })
})

app.get('/users/:id/posts/new', function (req, res) {
  var userID = req.params.id;
  res.render("posts/new-post", {userID: userID})
})

app.post('/users/:id/posts', function (req, res) {
  var userID = req.params.id;
  console.log(req.body);
  knex('posts').insert({title: req.body.title, body: req.body.body, user_id: knex.select('id').from('users').where('id', userID)}).then(function (data) {
    console.log(data);
    res.redirect(req.url)
  })
})
app.get('/users/:id/posts', function (req, res) {
  var userID = req.params.id;
  knex('posts').where({user_id: userID}).then(function(posts){
    res.render("posts/single-thread", {posts: posts, userID: userID})
  })
})

app.get('/users/:id/comments', function (req, res) {
  var userID = req.params.id;
  res.render('comments/all-comments');
})

app.get('/posts', function (req, res) {
  knex.from('users').innerJoin('posts', 'users.id', 'posts.user_id').then(function (posts){
    console.log(posts);
      res.render('posts/threads', {posts: posts});
  })
})

app.get('/posts/:id', function (req, res) {
  var userID = req.params.id;
  res.send('booyah');
})

app.get('/posts/:id/comments', function (req, res) {
  var userID = req.params.id;
  knex('comments').then(function (comments){

    res.render('comments/all-comments', {comments: comments, userID: userID});

  })
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
