var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var bodyparser = require('body-parser')
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var routes = require('./routes/index')

var app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views')) // 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs') // 设置视图模板引擎为 ejs

app.use(logger('dev')) // 加载日志中间件
app.use(express.json()) // 加载解析json的中间件
app.use(express.urlencoded({ extended: false })) // 加载解析urlencoded请求体的中间件
app.use(cookieParser('secret_will')) // 加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public'))) // 设置public文件夹为存放静态文件的目录
app.use(bodyparser.json()) // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }))
// 使用 session 中间件
app.use(session({
  secret: 'secret_will', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 3 // 设置 session 的有效时间，单位毫秒
  }
}))
// app.use('/', indexRouter);  //路由控制器
// app.use('/users', usersRouter);
routes(app)

// catch 404 and forward to error handler (捕获404错误，并转发到错误处理器)
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler (错误处理器，将错误信息渲染error模版并显示到浏览器中)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
