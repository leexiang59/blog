var blogList = require('./blog-list')
var userList = require('./user/user-list')
var apiPath = {
    root:'/api/',
    user:`/api/user/`
}
module.exports = function (app) {

    app.get(`${apiPath.root}blog-list`, blogList);

    app.get(`${apiPath.user}list`, userList.get);
    app.post(`${apiPath.user}add`, userList.add);
    app.post(`${apiPath.user}edit`, userList.edit);
    app.post(`${apiPath.user}delete`, userList.delete);
};