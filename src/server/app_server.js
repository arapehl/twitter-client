module.exports = function () {
  'use strict';

  var express = require('express');
  var session = require('express-session');
  var appConfig = require('./app_config');
  var secrets = require('./secrets');

  /*
   * Set up Express with the Jade templating engine
   */
  var app = express();
  app.set('title', appConfig.projectName);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);


  /*
   * Configure middleware
   */

  // Session handling
  app.use(
    session({
      resave: false, // deprecated, forcing off
      saveUninitialized: false, // deprecated, forcing off
      secret: secrets.session.secret,
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
  app.get('/',                      require('./routes/home'));
  app.get('/signin',                require('./routes/signin'));
  app.get('/auth/twitter/callback', require('./routes/request_callback'));
  app.get('/signout',               require('./routes/signout'));

  return app;
};
