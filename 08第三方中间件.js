/*
第三方中间件就是别人开发好的中间件，需要下载，use
使用步骤
1）下载安装 npm i body-parse
2) 引入 require()
3) app.use()使用第三方中间件
4）使用中间件中方法或属性
*/
let express=require('express')
let app=express()
let bodyParser=require('body-parser')
// 配置
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 向服务器提交数据
// 1）写表单
// 2）postman
// 3)ajax
app.post('/dopublish',(req,res)=>{
    // res.body
    console.log(req.body)
})
app.listen(3000,()=>{
    console.log("3000 Running...")
})