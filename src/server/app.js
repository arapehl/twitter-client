(function () {
  'use strict';

  var https = require('https');
  var util = require('util');

  /*
   * Set up OAuth
   */
  var oAuthConfig = require('./oauth_config');
  var oauth = require('./auth')(oAuthConfig.api_key, oAuthConfig.api_secret, oAuthConfig.callback);

  /*
   * Set up Express with the Jade templating engine
   */
  var express = require('express');
  var session = require('express-session');
  var app = express();
  app.set('title', 'Ara’s Twitter Client');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);


  /*
   * Set up middleware
   */

  // Session handling
  app.use(
    session({
      resave: false, // deprecated, forcing off
      saveUninitialized: false, // dprecated, forcing off
      secret: 'supercalifragilisticexpialidocious',
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  // Errors
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


  /*
   * Set up routes
   */
  app.get('/', function (req, res) {
    var data = {
      title: app.get('title'),
      authorized: false
    };
    if (req.session && req.session.oauth && req.session.oauth.access_token) {
      console.log('getting stream');
      console.log(req.session.oauth.access_token);
      console.log(req.session.oauth.access_token_secret);
      data.authorized = true;
      data.screen_name = req.session.screen_name;
      oauth.get(
        'https://stream.twitter.com/1.1/statuses/filter.json?delimited=length&track=twitterapi',
        req.session.oauth.access_token,
        req.session.oauth.access_token_secret,
        function (e, data, res) {
          console.log('stream?');
          if (e) console.error(e);
          console.log(util.inspect(data));
          res.on('data', function (d) {
            console.log('d', d);
          });
          res.on('error', function (e) {
            console.error(e);
          });
        });
    }
    res.render('index', data);

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
   
  });

  app.get('/signout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
  });

  app.listen(80, function () {
    console.log('Listening on port %d', this.address().port);
  });
}());
