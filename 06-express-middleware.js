let express=require('express')
let app=express()
// 中间件：处理请求的，本质就是一个函数
// 在Express中，对中间件有几种分类
// 不关心请求的路径和请求方法的中间件
// 也就是说任何请求都会进入这个中间件
// req 请求对象
// res 响应对象
// next 下一个中间件

// app.use((req,res)=>{
//     console.log('请求进来了..')
// })
// ----next是一个方法，用来调用下一个中间件
// app.use((req,res,next)=>{
//     console.log("1")
//     next()
// })
// app.use((req,res,next)=>{
//     console.log("2")
//     next()

// })

// app.use((req,res,next)=>{
//     console.log("3")
//     res.send('333,end')
// })

// ----关心请求路径的中间件 以/xxx 开头的路径中间件
// 严格请求路径和方法
app.use((req,res,next)=>{
    console.log("1")
    next()
})
app.use('/a',(req,res,next)=>{
    console.log("a")
    // console.log(req.url)
})
app.use('/b',(req,res,next)=>{
    console.log("b")
    // console.log(req.url)
})
app.use('/c',(req,res,next)=>{
    console.log('c')
    console.log(req.url)
})
app.listen(3000,()=>{
console.log('app is running at port 3000')
})
