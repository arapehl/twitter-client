module.exports = function (req, res) {
  var appConfig = require('../app_config');
  var data = {
    title: appConfig.projectName,
    authorized: false
  };
  if (req.session.screen_name) {
    data.authorized = true;
    data.screen_name = req.session.screen_name;
  }
  res.render('index', data);
};
