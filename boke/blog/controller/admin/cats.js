var express = require('express');
var db=require('../../models/db')
var router = express.Router();

/* 渲染后台分类页面 */
router.get('/', function(req, res, next) {
  // res.render('admin/category_list');
  db.getAllCats(function(result){
    res.render('admin/category_list',{data:result});
    // console.log(result)//命令M得到数据
  })

});
//
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
  });
//渲染后台修改分类页面
  router.get('/edit', function(req, res, next) {
    let id=req.query.id;
    // console.log(id)//5e7c4a479764a511dc21cb0d
    //命令M根据ID查找相应的分类 result就是M给你返回的数据
    db.getCatsById(id,function(result){
// console.log(result)
res.render('admin/category_edit',{"data":result[0]});
    })

  });
// 处理添加分类请求
router.post('/add',function(req,res,next){
  // // 控制器中得到数据，然后命令m去向数据库插入数据
  // 1)得到数据 先试一下看数据是否能拿到
  // let ctitle=req.body.ctitle;
  // let csort=req.body.csort;
  // console.log(ctitle,csort)
  // 2)验证数据的合法性

  // 3）向数据插入数据，定义一个类 models db.js 暴露和引入后m去向数据库插入数据，保存数据要把数据给人家 req.body

  db.insertCats(req.body,function(result){
    if(result==1){
      res.send('添加分类成功了<a href="/admin/cats">查看分类列表</a>')
    }else{
      res.send('添加分类失败了<a href="/admin/cats">查看分类列表</a>')
    }
  })
})
// 处理编辑分类请求
router.post('/edit',function(req,res,next){
// 隐藏域
console.log(req.body)
db.updateCatsById(req.body,function(result){
if(result=='1'){
  res.send('更新成功了<a href="/admin/cats">返回列表</a>')
}else{
  res.send('更新fail了<a href="/admin/cats">返回列表</a>')
}
})

})
// 处理删除请求
router.get('/delete', function (req, res, next) {
  // 得到ID，命令M，去数据库删除数据
  let id = req.query.id;
  // 命令M根据ID删除对应的分类
  db.deleteCatsById(id,function(result){
      if(result == "1"){
          res.redirect("/admin/cats")
      }else{
          return;
      }
  })
});
module.exports = router;