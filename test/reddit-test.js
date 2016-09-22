var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest')(app);
// var morgan = require('morgan');

describe("Something", function () {
  it("works", function () {
    expect(true).to.eq(true);
  })
})

describe("Landing Page", function () {
  it("should display the landing page", function (done) {
    request.get('/')
      .expect(404, done)
  })
})
