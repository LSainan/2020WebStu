var express = require('express');
var db = require("../../models/db")
var router = express.Router();

router.get('/', function(req, res, next) {
  // 得到id
  let id = req.query.id;
  // 命令M去数据库找文章详情
  db.getArticleById(id,function(result){
    res.render("home/article", {data:result[0]})
  });

});

module.exports = router;
