
const mysql = require('mysql')
const connectObj = {
  host: '47.107.152.246',
  user: 'root',
  password: 'dl,0509.LX',
  database: 'will_self'
}
/* let connection = null
function startSQL () {
  connection = mysql.createConnection(connectObj)
  connection.connect(function (err) {
    if (err) {
      setTimeout(startSQL, 1000)
    }
  })
  connection.on('error', function (err) {
    startSQL()
  })

  // 自定义的错误处理，将错误信息返回给接口
  connection.error = (err, res) => {
    res.send({
      status: -1,
      message: err
    })
    startSQL()
    return false
  }
}
startSQL() */
let connection = mysql.createPool(connectObj)
connection.error = (err, res) => {
  res.send({
    state: -1,
    message: err
  })
}
module.exports = connection
