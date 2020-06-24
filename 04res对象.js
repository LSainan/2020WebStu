// let experess=require('express')
// let app=experess();
// app.get('/',(req,res,next)=>{
//     res.send('<h1>学习res</h1>')
//     // res.send('<h1>学习res</h1>')
//     // // 在发送完响应正文后，不能再设置响应头
//     // Cannot set headers after they are sent to the client
// }).listen(3000,()=>{
//     console.log('3000~running...')
// })

// =============================
// 需要知道：
// 1）常用的属性和方法：
/*
res.send();发送各种类型的响应
res.sendFile();发送文件
res.sendStatus() 设置响应的状态
res.render();渲染模板应用 ejs
res.json() 发送JSON格式得响应
res.redirect() 重定向 重定向到登录页面
res.download 以下载的方式响应
*/
// let express=require('express');
// let app=express();
// app.get('/',(req,res,next)=>{
//     console.log(req.hostname)
//     res.send('<h1>学习req</h1>')
//     next()
// })
// app.get('',( req,res,next)=>{
//     console.log('2')
// })
// app.listen(3000,()=>{
//     console.log('3000port running...')
// })

// ------------------
let express=require('express')
let app=express();
// app.get('/',(req,res,next)=>{
//     // send方法只能写一个
// // res.send('<h1>学习res</h1>')
// res.json({
//     "name":'wangcai',
//     "age":100
// })
// })
app.get('/shop',(req,res)=>{
    res.json({
        'shop':'666'
    })
})
app.listen(3000,()=>{
console.log('3000~running')
})