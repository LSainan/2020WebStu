var express = require('express');
var db=require('../../models/db')
var router = express.Router();

/* 渲染后台文章列表页面 */
router.get('/', function (req, res, next) {
  // 这里不能仅仅渲染文章列表了，还需要从数据库得到数据

  // 命令M去数据库中得到数据
  db.getAllArticles(function(result){
      res.render("admin/article_list",{data:result})
  });
});
/* 渲染后台文章添加页面 */
router.get('/add', function(req, res, next) {
    // 命令M去数据库得到分类的数据
  db.getAllCats(function(result){
    res.render('admin/article_add',{data:result});
  })

  });
/* 处理添加文章的逻辑 */
router.post('/add', function(req, res, next) {
//  得到文章的数据 body-parser
// console.log(req.body)
var cat=req.body.cat;
var title=req.body.ctitle;
var summary=req.body.summary;
var content=req.body.content;
var time=new Date();
var post={
  'cat':cat,
  'title':title,
  'summary':summary,
  'content':content,
  'time':time,
}
// 命令M保存文章到数据库
db.saveArticle(post,function(result){
if(result==1){
  res.send('添加文章成功了 <a href=/admin/posts>查看分类列表</a>')
}else{
  res.send('添加文章fail了 <a href=/admin/posts>查看分类列表</a>')
}
})


});
// 渲染后台文章的编辑页面
router.get('/edit',function(req,res,next){
  // 得到查询字符串
  let id=req.query.id
  // res.render("admin/article_edit")
//   // console.log(id)
  db.getArticleById(id,function(result){
    console.log(result)
    res.render("admin/article_edit",{"data":result[0]})
  })

})
// 处理编辑文章请求
router.post('/edit',function(req,res,next){
// console.log(req.body)
// 利用M实现更新操作
db.updatePostsById(req.body,function(result){
  if(result=="1"){
    res.send('更新成功了<a href="/admin/posts">返回列表</a>')
  }else{
    res.send('更新成功了<a href="/admin/posts">返回列表</a>')
  }
})
})


// 渲染后台文章的删除页面
// 处理删除请求
router.get('/delete', function (req, res, next) {
  // 得到ID，命令M，去数据库删除数据
  let id = req.query.id;
  // 命令M根据ID删除对应的分类
  db.deletePostsById(id,function(result){
      if(result == "1"){
          res.redirect("/admin/posts")
      }else{
          return;
      }
  })
});



module.exports = router;