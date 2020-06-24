let express=require('express');
let session=require('express-session')
let app=express()
app.use(session({
    secret:'hanhan',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:10000}
}))
app.get('/',(req,res)=>{
    // 设置session
    req.session.username='hanhan';
    console.log(req.session.username);
    res.send('<h1>憨憨</h1>')

})
app.listen(3000,()=>{
    console.log('3000 Running....')
})