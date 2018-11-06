var blogList = require('./blog-list')
var userList = require('./user/user-list')
module.exports = function (app) {

    app.get('/api/blog-list', blogList);

    app.get('/api/user/user-list', userList.get);
    app.post('/api/user/user-add', userList.add);
    app.post('/api/user/user-edit', userList.edit);
    app.post('/api/user/user-delete', userList.delete);
};