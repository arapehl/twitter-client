(function () {
  'use strict';

  var https = require('https');
  var appConfig = require('./app_config');
  var routeHandlers = require('./route_handlers');

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

  app.use(function (req, res, next) {
    next();
  });

  // Errors
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


  /*
   * Set up routes
   */
  app.get('/', routeHandlers.home);
  app.get('/signin', routeHandlers.signin);
  app.get('/auth/twitter/callback', routeHandlers.requestCallback);
  app.get('/signout', routeHandlers.signout);


  /*
   * Listen on port 80
   */
  app.listen(appConfig.listenPort, function () {
    console.log('Listening on port %d', this.address().port);
  });
}());
