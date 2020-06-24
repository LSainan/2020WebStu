let epxress = require("express");

let app = epxress();
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.listen(3000,()=>{
    console.log('3000 Running~')
})