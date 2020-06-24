var express = require('express');
var db = require("../../models/db")
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // 从数据库得到所有的文章
  // 命令M去得到所有的文章
  db.getAllArticles(function (result) {
    res.render("home/index", { data: result })
  });
  // res.render('home/index');
});
module.exports = router;
