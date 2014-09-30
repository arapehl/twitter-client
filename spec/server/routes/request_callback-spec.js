var expect = require('chai').expect;
var sinon = require('sinon');
var requestCallback = require('../../../src/server/routes/request_callback.js');
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

describe('Route: /requestCallback', function () {
  it('should return a function', function () {
    expect(typeof requestCallback).to.equal('function');
  });
});
