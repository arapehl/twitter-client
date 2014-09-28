var expect = require('chai').expect;
var app = require('../../src/server/app');

describe('App', function () {
  it('should export an object', function () {
    expect(typeof app).to.equal('object');
  });
});
