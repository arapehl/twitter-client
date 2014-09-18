var expect = require('chai').expect;
var auth = require('../../src/server/auth');

describe('Auth', function () {
  it('should be a function', function () {
    expect(typeof auth).to.equal('function');
  });
  it('should return an object', function () {
    expect(typeof auth()).to.equal('object');
  });
});
