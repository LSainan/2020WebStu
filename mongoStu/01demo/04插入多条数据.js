// var MongoCliet=require('mongodb').MongoClient;
// var url='mongodb://localhost:27017/student';
// MongoCliet.connect(url,{useNewUrlParser:true},function(err,db){
//     if(err)throw err;
//     console.log('数据库已创建！');
//     // 创建集合
//     var dbase=db.db('student');
//     let data=[
//         {'语文':89},
//         {'数学':99},
//         {'计算机':100},
//     ];
//     dbase.collection('score').insertMany(data,function(err,res){
//         if(err)throw err;
//         console.log('文档插入成功');
//         db.close();
//     })
// })
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    dbo.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});