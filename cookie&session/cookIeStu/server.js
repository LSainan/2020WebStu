/**
 * 种植（设置）cookie:
 * res.setHeader('set-cookie','username=hanhan')
 * res.cookie('username','xiaoqiang)
 * */
let express=require('express')
let cookieParser=require('cookie-parser')
let app=express()
app.use(cookieParser())
app.get('/',(req,res)=>{
    // console.log(req.cookies)
    // 服务器通过响应头向客户端种植一个cookie
    // res.serHeader()设置响应头
    res.setHeader('set-cookie','username=hanhan')
    // 在express中专门封装了一个方法，用来给客户端种植cookie
    res.cookie('username','lili')
})
app.listen(3000,()=>{
    console.log('3000 running~')
})