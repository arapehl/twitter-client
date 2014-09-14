var https = require('https');

var options = {
  hostname: 'api.twitter.com',
  port: 443,
  path: '/oauth/request_token',
  method: 'POST',
  headers: {
    'oauth_callback': 'http://twitter.a12n.com/'
  }
};

var req = https.request(options, function (res) {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);

  res.on('data', function (d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function (e) {
  console.error(e);
});
