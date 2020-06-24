var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session=require('express-session')
var logger = require('morgan');
var bodyParser=require('body-parser')

var indexRouter = require('./controller/home/index');
var posts = require('./controller/home/posts'); // 前台详情页面的控制器
var admin = require('./controller/admin/admin'); // 后台首页页面的控制器
var cats = require('./controller/admin/cats'); // 后台分类列表页面的控制器
var article = require('./controller/admin/posts'); // 后台文章管理页面的控制器
var usersRouter = require('./controller/admin/users');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').__express)
app.set('view engine', 'html');
// 设置session
app.use(session({
  secret: 'wangcai',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
// --------------------设置body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// ----------------------配置中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));
// 渲染登录页面
app.use("/admin/users",usersRouter)

app.use('/', indexRouter);
app.use("/posts", posts);  // 当访问 /posts 时 就交给posts这个控制器
// 后台首页面
app.use('/admin/index',chekLogin)
app.use('/admin/index',admin)
// 后台分类页面
app.use('/admin/index',chekLogin)
app.use('/admin/cats',cats)
// 后台文章管理
app.use('/admin/index',chekLogin)
app.use('/admin/posts',article)
// =======定义一个中间件，检测用户是否登录
function chekLogin(req,res,next){
if(!req.session.isLogin){
  res.redirect('/admin/users/login')
}
next()
}

app.use('*',(req,res)=>{
  res.render("404")
  })
// ===============catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
