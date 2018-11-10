let connection = require('../sql_config')
module.exports = {
  // 增加文章
  add: function (req, res) {
    let body = req.body
    connection.query('INSERT INTO article(title,content,author,createTime,createTimeStamp,updateTime,updateTimeStamp) VALUES(?,?,?,?,?,?,?)',
      [body.title, body.content, body.author, body.createTime, body.createTimeStamp, body.updateTime, body.updateTimeStamp],
      function (error, results, fields) {
        if (error) throw error
        res.json({
          status: 0,
          data: null,
          message: '添加成功'
        })
      })
  },

  // 查询文章
  get: function (req, res) {
    let SELECT = req.params && req.params.id ? `SELECT * FROM article WHERE id=${req.params.id}` : 'SELECT * FROM article'
    connection.query(SELECT, function (error, results, fields) {
      if (error) throw error
      res.json({
        status: 0,
        data: results,
        message: '获取成功'
      })
    })
  },

  // 修改文章
  update: function (req, res) {
    let body = req.body
    connection.query('UPDATE article SET title=?,content=? WHERE id=?', [body.title, body.content, body.id - 0], function (error, results, fields) {
      if (error) throw error
      res.json({
        status: 0,
        data: null,
        message: '更新成功'
      })
    })
  },

  // 删除文章
  delete: function (req, res) {
    let body = req.body
    connection.query('DELETE FROM user WHERE id=?', [body.id], function (error, results, fields) {
      if (error) throw error
      res.json({
        status: 0,
        data: null,
        message: '删除成功'
      })
    })
  }
}
