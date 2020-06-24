let express=require('express');
let bodyParser=require('body-parser')
let app=express();
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let student=require('./controller/student')
// 静态托管
app.use(express.static('public'))
// 配置模板引擎
app.set('view engine','ejs')
// 服务端渲染
app.get('/byejs',student.showIndexByEjs)
// 客户端渲染
app.get('/byajax',student.showIndexByAjax)
app.get("/allstudent",student.allstudent);
app.get('/add',student.add)
app.post('/add',student.doadd)
app.listen(3000,()=>{
    console.log('3000,Running...')
})