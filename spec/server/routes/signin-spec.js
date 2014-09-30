var expect = require('chai').expect;
var sinon = require('sinon');
var signin = require('../../../src/server/routes/signin.js');
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

describe('Route: /signin', function () {
  it('should return a function', function () {
    expect(typeof signin).to.equal('function');
  });
  xit('should call redirect', function () {
    signin(req, res);
    expect(res.redirect.called).to.equal(true);
  });
  xit('should call redirect with the authenticate url arg', function () {
    signin(req, res);
    expect(res.redirect.calledWith('https://twitter.com/oauth/authenticate?oauth_token=abc123')).to.equal(true);
  });
});
