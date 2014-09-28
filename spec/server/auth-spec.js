var expect = require('chai').expect;
var auth = require('../../src/server/auth');

describe('Auth', function () {

  var oauth;
  var callback;

  beforeEach(function () {
    callback = function () {};
    oauth = auth('foo', 'bar', callback);
  });

  afterEach(function () {
    callback = null;
    oauth = null;
  });

  it('should export a function', function () {
    expect(typeof auth).to.equal('function');
  });

  it('should return an OAuth object for Twitter', function () {
    expect(typeof oauth).to.equal('object');
    expect(oauth._requestUrl).to.equal('https://api.twitter.com/oauth/request_token');
    expect(oauth._accessUrl).to.equal('https://api.twitter.com/oauth/access_token');
    expect(oauth._isEcho).to.equal(false);
    expect(oauth._requestUrl).to.equal('https://api.twitter.com/oauth/request_token');
    expect(oauth._accessUrl).to.equal('https://api.twitter.com/oauth/access_token');
    expect(oauth._consumerKey).to.equal('foo');
    expect(oauth._consumerSecret).to.equal('bar');
    expect(oauth._version).to.equal('1.0');
    expect(oauth._authorize_callback).to.equal(callback);
    expect(oauth._signatureMethod).to.equal('HMAC-SHA1');
    expect(oauth._nonceSize).to.equal(32);

    expect(typeof oauth._headers).to.equal('object');
    expect(oauth._headers.Accept).to.equal('*/*');
    expect(oauth._headers.Connection).to.equal('close');
    expect(oauth._headers['User-Agent']).to.equal('Node authentication');

    expect(typeof oauth._defaultClientOptions).to.equal('object');
    expect(oauth._defaultClientOptions.requestTokenHttpMethod).to.equal('POST');
    expect(oauth._defaultClientOptions.accessTokenHttpMethod).to.equal('POST');
    expect(oauth._defaultClientOptions.followRedirects).to.equal(true);

    expect(typeof oauth._clientOptions).to.equal('object');
    expect(oauth._clientOptions.requestTokenHttpMethod).to.equal('POST');
    expect(oauth._clientOptions.accessTokenHttpMethod).to.equal('POST');
    expect(oauth._clientOptions.followRedirects).to.equal(true);

    expect(oauth._oauthParameterSeperator).to.equal(',');
  });

});
