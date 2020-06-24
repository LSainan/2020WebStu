// 管理分类的路由，也叫控制器 自定义模块 二级路由
const express=require('express');
let router=express.Router();
router.get('/',(req,res,next)=>{
    res.send('<h1>显示分类列表</h1>')
})
router.get('/add',(req,res,next)=>{
    res.send('<h1>添加分类</h1>')
})
router.get('/update',(req,res,next)=>{
    res.send('<h1>修改分类</h1>')
})
router.get('/delete',(req,res,next)=>{
    res.send('<h1>删除分类</h1>')
})
// 导出router
module.exports=router;