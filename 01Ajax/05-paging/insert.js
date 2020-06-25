// 创建数据库和集合
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/pading';
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("pading");
    dbase.createCollection('newsList', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
// 插入数据
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("pading");
    var myobj =
        [
            {
                "title":"这是新闻标题1",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述1"
            },{
                "title":"这是新闻标题2",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述2"
            },{
                "title":"这是新闻标题3",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述3"
            },{
                "title":"这是新闻标题4",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述4"
            },{
                "title":"这是新闻标题5",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述5"
            },{
                "title":"这是新闻标题6",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述6"
            },{
                "title":"这是新闻标题7",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述7"
            },{
                "title":"这是新闻标题8",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述8"
            },{
                "title":"这是新闻标题9",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述9"
            },{
                "title":"这是新闻标题10",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述10"
            },{
                "title":"这是新闻标题11",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述11"
            },{
                "title":"这是新闻标题12",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述12"
            },{
                "title":"这是新闻标题13",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述13"
            },{
                "title":"这是新闻标题14",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述14"
            },{
                "title":"这是新闻标题15",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述15"
            },{
                "title":"这是新闻标题16",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述16"
            },{
                "title":"这是新闻标题17",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述17"
            },{
                "title":"这是新闻标题18",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述18"
            },{
                "title":"这是新闻标题19",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述19"
            },{
                "title":"这是新闻标题20",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述20"
            },{
                "title":"这是新闻标题21",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述21"
            },{
                "title":"这是新闻标题22",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述22"
            },{
                "title":"这是新闻标题23",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述23"
            },{
                "title":"这是新闻标题24",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述24"
            },{
                "title":"这是新闻标题25",
                "time":"2020-04-02 10:50:21",
                "summary":"这是新闻概述25"
            }
        ];
    dbo.collection("newsList").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});