let connection = require('../sql_config')
// 根据时间排序（冒泡排序）
function sortByTime (data, time) {
  let len = data.length - 1
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (data[j][time] < data[j + 1][time]) {
        let tmp = data[j]
        data[j] = data[j + 1]
        data[j + 1] = tmp
      }
    }
  }
  return data
}
module.exports = {
  // 增加文章
  add: function (req, res) {
    let body = req.body
    // 新增文章时，createTime和updateTime都置为当前时间
    connection.query(`INSERT INTO article(title,content,author,createTime,updateTime) VALUES(?,?,'will',NOW(),NOW())`,
      [body.title, body.content, body.author, body.createTime, body.updateTime],
      function (err, results, fields) {
        if (err) {
          connection.error(err)
          return false
        }
        res.json({
          status: 0,
          data: {
            id: results.insertId
          },
          message: '添加成功'
        })
      })
  },

  // 查询文章
  get: function (req, res) {
    let SELECT = req.params && req.params.id ? `SELECT * FROM article WHERE id=${req.params.id}` : 'SELECT * FROM article'
    connection.query(SELECT, function (err, results, fields) {
      if (err) {
        connection.error(err)
        return false
      }
      res.json({
        status: 0,
        data: sortByTime(results, 'updateTime'), // 根据文章更新时间排序显示
        message: '获取成功'
      })
    })
  },

  // 修改文章
  update: function (req, res) {
    let body = req.body
    // 修改文章时updateTime置为当前时间
    connection.query('UPDATE article SET title=?,content=?,updateTime=NOW() WHERE id=?', [body.title, body.content, body.id - 0], function (err, results, fields) {
      if (err) {
        connection.error(err)
        return false
      }
      res.json({
        status: 0,
        data: {
          id: body.id
        },
        message: '更新成功'
      })
    })
  },

  // 删除文章
  delete: function (req, res) {
    let body = req.body
    connection.query('DELETE FROM article WHERE id=?', [body.id], function (err, results, fields) {
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
  }
}
