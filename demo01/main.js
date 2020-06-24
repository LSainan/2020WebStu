/*
入口文件。一般叫main.js/app.js/index.js
express中使用ejs,需要把前端写好的页面放到views这个目录下面
*/
let express=require('express')
let app=express();
let ejs=require('ejs')
let order=require('./controllers/order')
// 引入body-parser
let bodyParser = require('body-parser')

// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine','ejs');
// 功能1 ：当有人访问localhost:3000 显示首页面
app.get('/',order.showIndex);//一级路由 显示首页面
app.post('/save',order.save)
app.get('/allorder',order.allorder)
// order/  :shouo表示动态参数
app.get('/order/:shoujihao',order.oneorder)
// express 有一个内置的中间件，可以托管静态资源
app.use(express.static('public'));//实现托管静态资源

app.listen(3000,()=>{
    console.log('3000port Running...')
})