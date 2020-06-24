let express=require('express')
let app=express();
let ejs=require('ejs')
// 配置模板引擎
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index.ejs'),{

    }
 })
// 实现静态资源托管
app.use(express.static('public'))
app.use(express.static('node_modules'))
app.listen(3000,()=>{
    console.log("3000port running....")
})