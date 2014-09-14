(function () {
  'use strict';

  var oAuthConfig = require('./oauth_config');
  var OAuth = require('oauth').OAuth,
      oauth = new OAuth(
        "https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        oAuthConfig.api_key,
        oAuthConfig.api_secret,
        "1.0",
        oAuthConfig.callback,
        "HMAC-SHA1"
      );
  var express = require('express');
  var session = require('express-session');
  var app = express();

  app.use(session({secret: 'ugh', cookie: {maxAge: 60000}}));


  app.get('/', function (req, res) {
    // Redirect to auth if not logged in
    if (!req.session.oauth) {
      res.redirect('/auth/twitter');
    } else {
      res.send('Hello, you');
    }
  });

  app.get('/auth/twitter', function(req, res) {
   
    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
      if (error) {
        console.log(error);
        res.send("Authentication Failed!");
      }
      else {
        req.session.oauth = {
          token: oauth_token,
          token_secret: oauth_token_secret
        };
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
      }
    });
   
  });

  app.get('/auth/twitter/callback', function(req, res, next) {
   
    if (req.session.oauth) {
      req.session.oauth.verifier = req.query.oauth_verifier;
      var oauth_data = req.session.oauth;
   
      oauth.getOAuthAccessToken(
        oauth_data.token,
        oauth_data.token_secret,
        oauth_data.verifier,
        function(error, oauth_access_token, oauth_access_token_secret, results) {
          if (error) {
            console.log(error);
            res.send("Authentication Failure!");
          }
          else {
            req.session.oauth.access_token = oauth_access_token;
            req.session.oauth.access_token_secret = oauth_access_token_secret;
      console.log('********************************************************************************');
      console.log(req);
            res.send("Authentication Successful");
            //res.redirect('/'); // You might actually want to redirect!
          }
        }
      );
    }
    else {
      res.redirect('/login'); // Redirect to login page
    }
   
  });

  app.listen(80);
}());
