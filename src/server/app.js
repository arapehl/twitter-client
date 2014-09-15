(function () {
  'use strict';

  /*
   * Defaults
   */
  var appName = "Ara's Twitter Client";

  /*
   * Set up OAuth
   */
  var oAuthConfig = require('./oauth_config');
  var OAuth = require('oauth').OAuth;
  var oauth = new OAuth(
        "https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        oAuthConfig.api_key,
        oAuthConfig.api_secret,
        "1.0",
        oAuthConfig.callback,
        "HMAC-SHA1"
      );

  /*
   * Set up Express with the Jade templating engine
   */
  var express = require('express');
  var session = require('express-session');
  var app = express();
  app.set('views', './views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);


  /*
   * Set up middleware
   */
  app.use(session({secret: 'ugh', cookie: {maxAge: 60000}}));
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


  /*
   * Set up routes
   */
  app.get('/', function (req, res) {
    res.render('index', {
      title: appName
    });
    // Redirect to auth if not logged in
    /*
    if (!req.session.oauth) {
      res.redirect('/auth/twitter');
    } else {
      res.send('Hello, you');
    }
    */
  });

  app.get('/signin', function(req, res) {
   
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

  app.listen(80, function () {
    console.log('Listening on port %d', this.address().port);
  });
}());
