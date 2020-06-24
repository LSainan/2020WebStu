// let express=require('express')
// // let fs=require('fs')
// // let ejs=require('ejs')
// let app=express()
// app.get('/',(req,res,next)=>{
//     // console.log(req.protocol)//http
//     console.log(req.hostname)//127.0.0.1
//     res.send('<h1>学习req</h1>')
// })
// app.listen(3000,()=>{
//     console.log("3000~running....")
// })

// ====================

let express=require('express')
let app=express();
// 路由 第一参数是pathname
app.get('/',(req,res)=>{
    res.send('<h1>首页面</h1>')
})
app.get('/list',(req,res)=>{
    res.send('<h1>列表页面</h1>')
})
app.post('/dopublish',(req,res)=>{
    res.send('...')
})
app.listen(3000,()=>{
    console.log('3000port running....')
})
