// express中内置的中间件 如：body=parse
// 在express中有很多中间件，不同的中间件，做不同的事情
// 概念：middleware
// let http=require('http')
// http.createServer((req,res)=>{
//     // 解析表单 get请求体
//     // 解析表单 post请求体
//     // 解析 cookie
//     // 处理session
//     // 使用模板引擎
//     // console.logo(req.query)
//     // console.log(req.body) req 对象
// let urlObj=url.parse(req.url,true)
// req.query=urlObj.query
// // 解析post请求体
// req.body={
//     foo:'bar'
// }
// // 解析cookie
// req.cookies={
//     isLogin:true
// }
// // 配置模session
// req.session={


// }
//  // 配置模板引擎
//  res.render=function(){}
// //  处理业务
// }).listen(3000,()=>{
//     console.log("3000-running...")
// })
// =========================
// let express=require('express')
// let app=express()
// let path=require('path')
// // 托管静态资源
// app.use(express.static(path.join(__dirname,'public')))
// app.get('/',(req,res)=>{
//     res.send("<h1>这是浏览器 第一个express应用</h1>")
// })
// app.get("/shop",(req,res)=>{
//     res.send('<h1>购物页面</h1>')
// })
// app.get("/order",(req,res)=>{
//     res.send('<h1>订单页面</h1>')
// })
// app.listen(3000,()=>{
//     console.log('3000~running....')
// })

// ---------------
// let express=require('express')
// let app=express();
// // 中间件1
// app.use('/shop',(req,res,next)=>{
// console.log('中间件1')
// next()
// })
// // 中间件2
// app.use('/shop',(req,res,next)=>{
//     console.log('中间件2')
//     next()
// })
// app.get('/shop',(req,res)=>{
//     res.json({
//         'shop':'666'
//     })
// })
// app.listen(3000,()=>{
// console.log('3000~running')
// })
// ---------------------
// let express=require('express')
// let app=express()
// // app.use('*',(req,res,next)=>{
// //     console.log('表示拦截所有的请求~')
// //     next()
// // })
// // *可以不写
// app.use((req,res,next)=>{
//     console.log('表示拦截所有的请求~')
//     next()
// })
// app.use('/shop',(req,res,next)=>{
//    res.json({
//        "首页":"999"
//    })
// })
// app.use('/order',(req,res,next)=>{
//   res.json({
//       "订单":'666'
//   })

// })
// app.listen(3000,()=>{
//     console.log('3000,running~')
// })

// ==============================实现文章管理和分类管理
// let express=require('express')
// let app=express()
// 路由 所有路由都写在一起不好维护
// 其他路由规划成二级路由 中间件
// app.get('/article',(req,res)=>{
//     res.send('<h1>文章列表</h1>')
// })
// app.get('/article/add',(req,res)=>{
//     res.send('<h1>添加文章</h1>')
// })
// app.get('/article/update',(req,res)=>{
//     res.send('<h1>修改文章</h1>')
// })
// app.get('/article/delete',(req,res)=>{
//     res.send('<h1>删除文章</h1>')
// })
// //
// app.get('/cat',(req,res)=>{
//     res.send('<h1>分类列表</h1>')
// })
// app.get('/cat/add',(req,res)=>{
//     res.send('<h1>添加分类</h1>')
// })
// app.get('/cat/update',(req,res)=>{
//     res.send('<h1>修改分类</h1>')
// })
// app.get('/cat/delete',(req,res)=>{
//     res.send('<h1>删除分类</h1>')
// })

// app.listen(3000,()=>{
//     console.log('3000 runing~')
// })


// =============路由中间件
// 路由对象
//let router=express.Router();
// router 也叫控制器
// 规划处两个一级路由

let express=require('express')
let app=express()
// 引入二级路由文件
let article=require('./router/article')
let cat=require('./router/cat')
// 一级路由
app.use('/article',article)
app.use('/cat',cat)
app.listen(3000,()=>{
console.log('3000Port Running~')
})