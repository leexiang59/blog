// API
var apis = require('../api/index')
// Page
var pages = require('../page/index')

module.exports = function (app) {

  apis(app);

  pages(app);

};