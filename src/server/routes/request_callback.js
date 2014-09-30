module.exports = function(req, res, next) {
  var oAuthConfig = require('../secrets').oauth;
  var oauth = require('../auth')(oAuthConfig.api_key, oAuthConfig.api_secret, oAuthConfig.callback);

  if (req.session.oauth_token && req.session.oauth_token_secret) {
    oauth.getOAuthAccessToken(
      req.session.oauth_token,
      req.session.oauth_token_secret,
      req.query.oauth_verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.log(error);
          res.send("Authentication Failure!");
        }
        else {
          req.session.oauth_access_token = oauth_access_token;
          req.session.oauth_access_token_secret = oauth_access_token_secret;
          req.session.screen_name = results.screen_name;
          req.session.user_id = results.user_id;
          res.redirect('/');
        }
      }
    );
  }
  else {
    res.redirect('/signin');
  }
};
