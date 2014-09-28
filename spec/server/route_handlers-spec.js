var expect = require('chai').expect;
var routeHandlers = require('../../src/server/route_handlers');

describe('Route Handlers', function () {

  it('should export an object', function () {
    expect(typeof routeHandlers).to.equal('object');
  });

  it('should expose a home route', function () {
    expect(typeof routeHandlers.home).to.equal('function');
  });

  it('should expose a signin route', function () {
    expect(typeof routeHandlers.signin).to.equal('function');
  });

  it('should expose a request callback route', function () {
    expect(typeof routeHandlers.requestCallback).to.equal('function');
  });

  it('should expose a signout route', function () {
    expect(typeof routeHandlers.signout).to.equal('function');
  });

});
