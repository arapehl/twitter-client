(function () {
  'use strict';

  var appServer = require('./app_server')();
  var appConfig = require('./app_config');

  appServer.listen(appConfig.listenPort, function () {
    console.log('Listening on port %d', this.address().port);
  });
}());
