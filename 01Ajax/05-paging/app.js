let express = require('express');
let path = require('path');
let app = express();
var MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/pading"

app.use(express.static(path.join(__dirname, "public")))
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express)
app.set('view engine', 'html');
app.get('/', (req, res) => {
    let pagesize = 5;//每一页显示多少条数据
    let page = req.query.page || 1;//当前是第几页
    // console.log(parseInt(page))
    // console.log(typeof parseInt(page))//number
    // res.render('01-传统不分页显示新闻.html')
    (page <= 0) && (page == 1);
    let offset = (parseInt(page) - 1) * pagesize;//偏移量
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("pading");
        dbo.collection("newsList").find().skip(offset).limit(pagesize).toArray(function (err, result) {
            if (err) throw err;
            // 查看news中有多少条数据
            dbo.collection('newsList').find().count().then((value)=>{
                let total=value;
                // 计算多少页
                let size=Math.ceil(total/pagesize);
                res.render('02-传统传统分页显示新闻.html', {
                    data: result,
                    page,//当前第几页
                    pagesize,//每页显示条数
                    total,//总共的新闻条数
                    size,//总的页数
                })
            }).catch((reason)=>{
                console.log(reason);
            })
            db.close();
        });
    });
})

app.listen(3000, () => {
    console.log("3000,Running~")
})
/*
不分页
app.get('/',(req,res)=>{
    // res.render('01-传统不分页显示新闻.html')
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pading");
        dbo.collection("newsList").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
             res.render('02-传统传统分页显示新闻.html',{data:result})
            db.close();
      });
    });
})
*/