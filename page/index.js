var home = require('./home')
var users = require('./users')
var test = require('./test')
module.exports = function (app) {
  app.get('/', home)

  app.get('/users', users)

  test()
}
