var express = require('express');
var router = express.Router();
// var db=require('../../models/admin/db')

/* 渲染登录页面 */
// router.use('/reg',checkNotLogin)
router.get('/reg', function(req, res, next) {
 res.render('reg')
});
// 处理登录的逻辑
// 当用户提交了表单，检测用户名是否可用
// let user=['admin','hanhan'];
// router.post('/doreg',(req,res)=>{
//     let username=req.body.username.trim();
//     // let password=req.body.password.trim();
//     // let repassword=req.body.repassword.trim();
//     // 检测用户名在数据库是否存在
//     if(user.find(user=>user==username)){
//         // 用户名已经存在
//         res.send('<p>对不起,该用户已被注册</p>')
//     }else{
//         res.send('<p>该用户可以使用</p>')
//     }
// })

module.exports = router;