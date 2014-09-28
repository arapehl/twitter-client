var expect = require('chai').expect;
var appConfig = require('../../src/server/app_config');

describe('App Config', function () {

  it('should export an object', function () {
    expect(typeof appConfig).to.equal('object');
  });

  it('should have a projectName property', function () {
    expect(typeof appConfig.projectName).to.equal('string');
  });

  it('should have a listenPort property', function () {
    expect(typeof appConfig.listenPort).to.equal('number');
  });

});
