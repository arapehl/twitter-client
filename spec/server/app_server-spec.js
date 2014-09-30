var expect = require('chai').expect;
var appServer = require('../../src/server/app_server');

describe('App Server', function () {
  it('should be defined', function () {
    expect(typeof appServer).to.equal('function');
  });
});
