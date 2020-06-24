let express = require('express')
let app = express();
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
//
app.use(cookieParser())
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/list', (req, res) => {
    res.send('<h2>列表页面</h2>')
})
app.get('/user', (req, res) => {
    if (req.cookies.isLogin) {
        res.send("<h2>用户中心 <a href='/'>返回首页<a> <a href='/logout'>退出登录</a></h2>")
    }
    else {
        res.redirect('/login')
    }
})
app.get('/logout',(req,res)=>{
    // 使用cookies来实现登录控制，想退出登录,只要让cookie失败
    res.cookie('isLogin',true,{maxAge:-1})
    res.redirect('/')
})
app.post('/dologin',(req,res)=>{
    let username=req.body.username.trim();
    let password=req.body.password.trim()
    // console.log(username,password)
    if(username=="admin@0919"&& password=='admin'){
        res.cookie('isLogin',true);
        res.redirect('/user')
    }
else{
    res.redirect('/login')
}
})
app.use(express.static('public'));//实现托管静态资源
app.use(express.static('node_modules'))
app.listen(3000, () => {
    console.log('3000Running....')
})