var expect = require('chai').expect;
var sinon = require('sinon');
var signout = require('../../../src/server/routes/signout.js');
var req;
var res;

beforeEach(function () {
  req = {
    session: {
    }
  };
  res = {
    redirect: sinon.stub()
  };
});

afterEach(function () {
  req = null;
  res = null;
});

describe('Route: /signout', function () {
  it('should return a function', function () {
    expect(typeof signout).to.equal('function');
  });
});

