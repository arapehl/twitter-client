var expect = require('chai').expect;
var sinon = require('sinon');
var home = require('../../../src/server/routes/home');
var appConfig = require('../../../src/server/app_config');
var req;
var res;

beforeEach(function () {
  req = {
    session: {
    }
  };
  res = {
    render: sinon.stub()
  };
});

afterEach(function () {
  req = null;
  res = null;
});

describe('Route: /home', function () {
  it('should return a function', function () {
    expect(typeof home).to.equal('function');
  });
  it('should call render', function () {
    home(req, res);
    expect(res.render.called).to.equal(true);
  });
  it('should render unauthorized index', function () {
    home(req, res);
    expect(res.render.calledWith('index', {
      'title': appConfig.projectName,
      'authorized': false
    })).to.equal(true);
  });
  it('should render authorized index', function () {
    req.session.screen_name = 'jdoe';
    home(req, res);
    expect(res.render.calledWith('index', {
      'title': appConfig.projectName,
      'authorized': true,
      'screen_name': 'jdoe'
    })).to.equal(true);
  });
});
