const { version } = require('./config')
const util = require('../../public/javascripts/util')
const userList = require('./user')
const article = require('./article')
const apiPath = {
  root: `/${version}/`,
  user: `/${version}/user/`,
  article: `/${version}/article/`
}

module.exports = function (app) {
  /**
   * 用户模块
   * */
  // 获取所有用户信息
  app.get(`${apiPath.user}list`, function (req, res) { util.apiHandle(req, res, userList.get) })
  // 获取当前用户信息
  app.get(`${apiPath.user}user_info`, function (req, res) { util.apiHandle(req, res, userList.user_info) })
  // 删除用户
  app.post(`${apiPath.user}delete`, function (req, res) { util.apiHandle(req, res, userList.delete) })
  // 注册
  app.post(`${apiPath.user}add`, function (req, res) { util.apiHandle(req, res, userList.add) })
  // 登录
  app.post(`${apiPath.user}login`, function (req, res) { util.apiHandle(req, res, userList.login) })
  // 登出
  app.get(`${apiPath.user}logout`, function (req, res) { util.apiHandle(req, res, userList.logout) })
  // 修改用户信息
  app.post(`${apiPath.user}update`, function (req, res) { util.apiHandle(req, res, userList.update) })

  /**
   * 文章模块
   * */
  app.get(`${apiPath.article}list/:id`, function (req, res) { util.apiHandle(req, res, article.get) })
  app.get(`${apiPath.article}list`, function (req, res) { util.apiHandle(req, res, article.get) })
  app.post(`${apiPath.article}add`, function (req, res) { util.apiHandle(req, res, article.add) })
  app.post(`${apiPath.article}update`, function (req, res) { util.apiHandle(req, res, article.update) })
  app.post(`${apiPath.article}delete`, function (req, res) { util.apiHandle(req, res, article.delete) })
}
