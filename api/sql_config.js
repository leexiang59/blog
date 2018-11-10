
const mysql = require('mysql')
const connectObj = {
  host: '47.107.152.246',
  user: 'root',
  password: 'dl,0509.LX',
  database: 'will_self'
}
let connection = mysql.createConnection(connectObj)
connection.connect()

module.exports = connection
