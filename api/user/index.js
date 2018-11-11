let connection = require('../sql_config')
module.exports = {
  // 注册
  add: function (req, res) {
    let body = req.body
    connection.query('INSERT INTO user(name,age) VALUES(?,?)', [body.name, body.age], function (err, results, fields) {
      if (err) {
        connection.error(err)
        return false
      }
      res.json({
        status: 0,
        data: null,
        message: '添加成功'
      })
    })
  },

  // 查询用户表所有用户信息
  get: function (req, res) {
    connection.query('SELECT * FROM user', function (err, results, fields) {
      if (err) {
        connection.error(err)
        return false
      }
      res.json({
        status: 0,
        data: results,
        message: '获取成功'
      })
    })
  },

  // 修改用户信息
  update: function (req, res) {
    let body = req.body
    connection.query('UPDATE user SET name=?,age=? WHERE id=?',
      [body.name, body.age, body.id],
      function (err, results, fields) {
        if (err) {
          connection.error(err)
          return false
        }
        res.json({
          status: 0,
          data: null,
          message: '更新成功'
        })
      })
  },

  // 删除用户信息
  delete: function (req, res) {
    let body = req.body
    connection.query('DELETE FROM user WHERE id=?', [body.id], function (err, results, fields) {
      if (err) {
        connection.error(err)
        return false
      }
      res.json({
        status: 0,
        data: null,
        message: '删除成功'
      })
    })
  },

  // 登录
  login: function (req, res) {
    let body = req.body
    connection.query('SELECT * FROM password,user WHERE password.userId=user.id and user.name=?',
      [body.name],
      function (err, results, fields) {
        if (err) {
          connection.error(err)
          return false
        }
        if (results && results.length > 0) {
          if (results[0].password === body.password) {
            req.session.userName = req.body.name // 设置session
            res.json({
              status: 0,
              data: {
                userName: body.name
              },
              message: '登录成功'
            })
          } else {
            res.json({
              status: 10001,
              data: null,
              message: '密码错误'
            })
          }
        } else {
          res.json({
            status: 1000,
            data: null,
            message: '用户不存在'
          })
        }
      })
  },

  // 登出
  logout: function (req, res) {
    let session = req.session
    if (session && session.userName) {
      req.session.userName = null
    }
    res.json({
      status: 0,
      data: null,
      message: '已登出'
    })
  },

  // 获取用户信息
  user_info: function (req, res) {
    let session = req.session
    if (session && session.userName) {
      res.json({
        status: 0,
        data: {
          userName: session.userName
        },
        message: '成功'
      })
    } else {
      res.json({
        status: 1008,
        data: null,
        message: '未登录'
      })
    }
  }
}
