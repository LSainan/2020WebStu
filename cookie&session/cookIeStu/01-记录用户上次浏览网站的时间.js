let express=require('express')
let app=express();
let cookiePares=require('cookie-parser')
app.use(cookiePares())
app.get('/',(req,res)=>{
    // last
    let last=req.cookies.last;
    res.cookie('last',new Date().toLocaleString(),{maxAge:1000*60*60*24*365})
    if(last){
        res.send(`<h1>您上次访问本网站的时间是${last}</h1>`)
    }
    else{
        res.send(`<h1>这是您第一次访问本网站~</h1>`)
    }
})
app.listen(3000,()=>{
    console.log('3000,Running...')
})