let express=require('express');
let app=express()
app.get('/',(req,res)=>{
    res.send('<h1>憨憨</h1>')
})
app.listen(3000,(req,res)=>{
    console.log('3000 Running....')
})