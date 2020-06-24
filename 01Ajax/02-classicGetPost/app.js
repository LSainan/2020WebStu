let express=require('express')
let app=express();
let bodyParser=require('body-parser')
var path = require('path');
//控制器
// var reg=require('./controller/reg')
// 设置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('html', require('ejs').__express)
app.set('view engine', 'html');

//路由

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));
app.get('/',(req,res,next)=>{
    res.render('reg.html')
})
let user=['admin','hanhan'];
app.post('/check',(req,res)=>{
    // let username=req.query.username;
    let username=req.body.username;
    // 检测用户名在数据库是否存在
    if(user.find(user=>user==username)){
        // 用户名已经存在
        // res.send('<span>对不起,该用户已被注册</span>')
        res.send(`对不起,该用户名${username}已被注册`)
    }else{
        // res.send('<span>该用户名可以使用</span>')
        res.send(`该用户名${username}可以使用`)
    }
})
app.listen(3000,()=>{
    console.log("3000 Running")
})