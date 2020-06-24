let express=require('express');
let path=require('path');
let app=express();//创建一个应用
app.use(express.static(path.join(__dirname,'public')));
//处理路由
app.get('/',(req,res)=>{
    res.send('<h1>你好，浏览器，这是第一个express应用</h1>')
})
app.get('/shop',(req,res)=>{
    res.send('<h1>这是购物车页面</h1>')
})
app.get('/order',(req,res)=>{
    res.send('<h1>这是订单页面</h1>')
})
app.get('/xx',(req,res)=>{
    res.send('<h1>你的页面飞了~</h1>')
})
app.listen(3000,()=>{
    console.log("服务器在3000端口启动了")
})