const express = require('express');
const app = express();

const config = require('./knexfile.js')
const enviornment = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const knex = require('knex')(config)[enviornment];
const ejs = require('ejs');

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('booyah');
})

app.listen(port, function() {
  console.log("listening on port: " + port);
})

module.exports = app;
