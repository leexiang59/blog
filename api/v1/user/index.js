let { connection } = require('../config')
module.exports = {
  // 注册
  add: function (req, res) {
    let body = req.body
    connection.query('INSERT INTO user(name,age) VALUES(?,?)', [body.name, body.age], function (err, results, fields) {
      if (err) {
        connection.error(err, res)
      } else {
        res.json({
          state: 0,
          data: null,
          message: '添加成功'
        })
      }
    })
  },

  // 查询用户表所有用户信息
  get: function (req, res) {
    connection.query('SELECT * FROM user', function (err, results, fields) {
      if (err) {
        connection.error(err, res)
      } else {
        res.json({
          state: 0,
          data: results,
          message: '获取成功'
        })
      }
    })
  },

  // 修改用户信息
  update: function (req, res) {
    let body = req.body
    connection.query('UPDATE user SET name=?,age=? WHERE id=?',
      [body.name, body.age, body.id],
      function (err, results, fields) {
        if (err) {
          connection.error(err, res)
        } else {
          res.json({
            state: 0,
            data: null,
            message: '更新成功'
          })
        }
      })
  },

  // 删除用户信息
  delete: function (req, res) {
    let body = req.body
    connection.query('DELETE FROM user WHERE id=?', [body.id], function (err, results, fields) {
      if (err) {
        connection.error(err, res)
      } else {
        res.json({
          state: 0,
          data: null,
          message: '删除成功'
        })
      }
    })
  },

  // 登录
  login: function (req, res) {
    let body = req.body
    connection.query('SELECT * FROM password,user WHERE password.userId=user.id and user.name=?',
      [body.name],
      function (err, results, fields) {
        if (err) {
          connection.error(err, res)
        } else {
          if (results && results.length > 0) {
            if (results[0].password === body.password) {
              req.session.userId = results[0].userId // 设置session
              req.session.userName = req.body.name // 设置session
              res.json({
                state: 0,
                data: {
                  userId: results[0].userId,
                  userName: body.name
                },
                message: '登录成功'
              })
            } else {
              res.json({
                state: 10001,
                data: null,
                message: '密码错误'
              })
            }
          } else {
            res.json({
              state: 1000,
              data: null,
              message: '用户不存在'
            })
          }
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
      state: 0,
      data: null,
      message: '已登出'
    })
  },

  // 获取用户信息
  user_info: function (req, res) {
    let session = req.session
    if (session && session.userName) {
      res.json({
        state: 0,
        data: {
          userId: session.userId,
          userName: session.userName
        },
        message: '成功'
      })
    } else {
      res.json({
        state: 1008,
        data: null,
        message: '未登录'
      })
    }
  }
}
