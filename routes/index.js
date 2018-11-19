// API
var apis = require('../api/v1/index')
// Page
var pages = require('../page/index')

module.exports = function (app) {
  apis(app)

  pages(app)
}
