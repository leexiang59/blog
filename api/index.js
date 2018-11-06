
var userList = require('./user/')
var article = require('./article/')
var apiPath = {
    root:'/api/',
    user:`/api/user/`,
    article:`/api/article/`,
}
module.exports = function (app) {

    // 用户信息
    app.get(`${apiPath.user}list`, userList.get);
    app.post(`${apiPath.user}add`, userList.add);
    app.post(`${apiPath.user}edit`, userList.edit);
    app.post(`${apiPath.user}delete`, userList.delete);

    // 文章
    app.get(`${apiPath.article}list`, article.get);
};