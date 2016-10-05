'use strict';

var expect = require( 'chai' ).expect;
var app = require( '../server' );
var request = require( 'supertest' )( app );
var morgan = require( 'morgan' );
var config = require( '../knexfile' );
var enviornment = process.env.NODE_ENV;
var knex = require( 'knex' )( config[ 'test' ] )


describe( "Something", function () {
    it( "works", function () {
        expect( true ).to.eq( true );
    } )
} )

describe( "Landing Page", function () {
    it( "should display the landing page", function ( done ) {
        request.get( '/' )
            .expect( 200 )
            .end( function ( err, res ) {
                if ( err ) {
                    return done( err );
                }
                expect( res.text ).to.contain( '<h1>what up fam</h1>' )
                done()
            } )
    } )
} )

describe('Users', function () {
 it('Should show all of the users', function (done) {
   request.get('/users')
          .expect(200)
          .end(function(err, res) {
            if(err){
              done(err)
            }
            knex('users').then(function (data) {
              expect(res.text).to.contain(data[0].username);
              expect(res.text).to.contain(data[1].username);
              done();
            })
          })
  })
  it('Should show the register new user page', function (done) {
    request.get('/users/new')
           .expect(200)
           .end(function(err, res) {
             if(err){
               done(err)
             }
            expect(res.text).to.contain("Register for reddit")
            done();
           })
   })
  it('Should show a specific user', function (done) {
    request.get('/users/1')
           .expect(200)
           .end(function(err, res) {
             if(err){
               done(err)
             }
             knex('users').where('id', 1).first().then(function (data) {
               expect(res.text).to.contain(data.username);
              //  expect(res.text).to.contain();
               done();
             })
           })
   })
 })
describe('POST user', function () {
  after(function (done) {
    knex('users').where('username', 'Pepsi_is_better').del().then(function (data) {

      done();
    });
  })
   it('POST Should post a new user and redirect the user back to the users page', function (done) {
     request.post('/users')
     .send({
       username: 'Pepsi_is_better',
       first_name: 'What',
       last_name: 'Did i do?',
       email: 'pepsi.hello@gmail.com'
     })
     .end(function(err, res) {
       if(err){
         done(err)
       }
       request.get('/users')
          .expect(200)
          .end(function(err, res) {
            if(err){
              done(err);
            }
            expect(res.text).to.include('Pepsi_is_better');
            done();
       })
     })
   })
})
