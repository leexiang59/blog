var blogList = require('./blog-list')
module.exports = function (app) {

    app.get('/api/blog-list', blogList);
};