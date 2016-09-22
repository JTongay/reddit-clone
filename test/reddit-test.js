'use strict';

var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest')(app);
var morgan = require('morgan');
var config = require('../knexfile');
var enviornment = process.env.NODE_ENV;
var knex = require('knex')(config['test'])


describe("Something", function () {
  it("works", function () {
    expect(true).to.eq(true);
  })
})

describe("Landing Page", function () {
  it("should display the landing page", function (done) {
    request.get('/')
      .expect(200)
      .end(function(err, res) {
        if(err){
          return done(err);
        }
        expect(res.text).to.contain('<h1>what up fam</h1>')
        done()
      })
  })
})

describe('/users', function () {
  before(function (done) {
    knex('users').insert({username: 'joey'}).then(function (err) {
      //
      done();
    })
  })
  after(function (done) {
    knex('users').truncate().then(function (err) {
      //
      done();
    })
  })
 it('should show the users page', function (done) {
   request.get('/users')
    .expect(200)
    .end(function (err, res) {
      if(err){
        return done(err);
      }
      knex.select('username').from('users').then(function (data) {
        console.log(data[1].username);
        expect(data[1].username).to.equal('joey')
      })
      done()
    })
  })
})

describe('/users/:id', function () {
  before(function (done) {
    knex('users').insert({username: 'poop'}).then(function (err) {
      //
      done();
    })
  })
  after(function (done) {
    knex('users').truncate().then(function (err) {
      //
      done();
    })
  })
  it('should show one particular user', function (done) {
    request.get('/users/0')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err)
      }
      knex.select('username').from('users').then(function (data) {
        console.log(data[0].username);
        expect(data[0].username).to.equal('poop');
        expect(res.text).to.contain("This is a single users page")
        done()
      })
    })
  })
})

describe('/users/:id/posts', function () {
  before(function (done) {
    knex('users').insert({username: 'poop'}).then(function (err) {
      //
      done();
    })
  })
  after(function (done) {
    knex('users').truncate().then(function (err) {
      //
      done();
    })
  })
  it('should show one particular users posts', function (done) {
    request.get('/users/0/posts')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err)
      }
      done()
    })
  })
})

describe('/users/:id/comments', function () {
  it('should show one particular users comments', function (done) {
    request.get('/users/0/comments')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err)
      }
      expect(res.text).to.contain('This is a single users comments page')
      done()
    })
  })
})


// --------------POST NEW USER-----------------------
describe('/users/new', function () {
  before(function (done) {
    knex('users').truncate().then(function(err){
      //
    });
    done();
  })
 it('should add a new user and redirect you to the users page', function (done) {
   request.post('/users/new')
    .expect(304)
    .send(knex('users').insert({username: 'booyah'}).then(function(err){
      //
    }))
    .expect('Location', /\/thank-you/, function (){
      request.get('/users')
        .expect(200)
        .expect(/This is the Users Page/, done)
    })
 })
})

// --------------------------------------------------

describe('/posts', function () {
 it('should show all of the posts', function (done) {
   request.get('/posts')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err)
      }
      done()
    })
 })
})

describe('/posts/:id', function () {
 it('should show particular post', function (done) {
   request.get('/posts/:id')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err)
      }
      done()
    })
 })
})

describe('/posts/:id/comments', function () {
 it('should show particular posts comments', function (done) {
   request.get('/posts/:id/comments')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err)
      }
      done()
    })
 })
})

// POST NEW Post
// describe('/users/new', function () {
//  it('should add a new user', function (done) {
//    request.post('/users/new')
//     .expect(304)
//     .end(function (err, res) {
//       if(err) {
//         return done(err)
//       }
//       knex('users').insert({username: 'booyah'}).then(function(err){
//         //
//       });
//       expect(res.text).to.contain('booyah');
//       done()
//     })
//  })
// })

// POST NEW Comment
// describe('/users/new', function () {
//  it('should add a new user', function (done) {
//    request.post('/users/new')
//     .expect(304)
//     .end(function (err, res) {
//       if(err) {
//         return done(err)
//       }
//       knex('users').insert({username: 'booyah'}).then(function(err){
//         //
//       });
//       expect(res.text).to.contain('booyah');
//       done()
//     })
//  })
// })
