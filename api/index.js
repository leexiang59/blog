
const userList = require('./user')
const article = require('./article')
const apiPath = {
  root: '/api/',
  user: `/api/user/`,
  article: `/api/article/`
}

module.exports = function (app) {
  /**
   * 用户模块
   * */
  // 所有用户信息
  app.get(`${apiPath.user}list`, userList.get)
  // 获取用户信息
  app.get(`${apiPath.user}user_info`, userList.user_info)
  // 删除用户
  app.post(`${apiPath.user}delete`, userList.delete)
  // 注册
  app.post(`${apiPath.user}add`, userList.add)
  // 登录
  app.post(`${apiPath.user}login`, userList.login)
  // 登出
  app.get(`${apiPath.user}logout`, userList.logout)
  // 修改用户信息
  app.post(`${apiPath.user}update`, userList.update)

  // 文章
  app.get(`${apiPath.article}list/:id`, article.get)
  app.get(`${apiPath.article}list`, article.get)
  app.post(`${apiPath.article}add`, article.add)
  app.post(`${apiPath.article}update`, article.update)
}
