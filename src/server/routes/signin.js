module.exports = function (req, res, next) {
  var oAuthConfig = require('../secrets').oauth;
  var oauth = require('../auth')(oAuthConfig.api_key, oAuthConfig.api_secret, oAuthConfig.callback);
  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    if (error) {
      console.log(error);
      res.send("Authentication Failed!");
    }
    else {
      req.session.oauth_token = oauth_token;
      req.session.oauth_token_secret = oauth_token_secret;
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
    }
  });
};
