var home = require('./home')
var users = require('./users')

module.exports = function (app) {

  app.get('/', home);

  app.get('/users', users);
};