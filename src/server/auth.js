var OAuth = require('oauth').OAuth;

module.exports = function (api_key, api_secret, callback) {
  return new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    api_key,
    api_secret,
    "1.0",
    callback,
    "HMAC-SHA1"
  );
};
