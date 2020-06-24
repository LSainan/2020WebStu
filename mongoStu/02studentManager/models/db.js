// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/student";

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   console.log("数据库已创建!");
//   db.close();
// });
// 创建集合
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/student';
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
//     console.log('数据库已创建');
//     var dbase = db.db("student");
//     dbase.createCollection('hs0324', function (err, res) {
//         if (err) throw err;
//         console.log("创建集合!");
//         db.close();
//     });
// });
// 插入数据
/*

*/
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/student";
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//   if (err) throw err;
//   console.log("数据库已创建!");
//   // 创建集合
//   var dbase = db.db("student");
//   let data = [
//     {"name":"李涵","age":18, "sex":"女", "provice":"河南"},
//     {"name":"裴语燕","age":24, "sex":"女", "provice":"天津"},
//     {"name":"贾玲","age":26, "sex":"女", "provice":"上海"},
//     {"name":"华宸雨","age":21, "sex":"男", "provice":"河南"},
//     {"name":"杨洋","age":26, "sex":"男", "provice":"广州"},
//     {"name":"杨紫","age":24, "sex":"女", "provice":"北京"},
//     {"name":"彭于晏","age":28, "sex":"男", "provice":"福建"},
//     {"name":"王一博","age":20, "sex":"男", "provice":"河南"},
//     {"name":"肖战","age":20, "sex":"男", "provice":"四川"},
//   ];
//   dbase.collection("hs1024").insertMany(data,function(err, res){
//     if (err) throw err;
//     console.log("文档插入成功");
//     db.close();
//   })
// });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/student";

// 写一个model先测试数据是否OK，如果OK，再给控制器
function getStudents(callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("student");
        dbo.collection("hs1024"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            callback(result); // 数据传给控制
            db.close();
        });
    });
}
// 存储一个学生的信息
function save(data,callback){
    // console.log(data)
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("student");
        dbo.collection("hs1024").insertOne(data, function(err, res) {
            if (err){
                console.log("插入数据失败了~");
                callback("-1"); // -1代表插入失败了
            };
            callback("1"); // 1代表插入数据成功了
            console.log("文档插入成功");
            db.close();
        });
    });
}
// 删除

function remove(data,callback){
    // console.log(data)
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("student");
        dbo.collection("hs1024").deleteOne(data, function(err, res) {
            if (err){
                console.log("删除数据失败了~");
                callback("-1"); // -1代表删除失败了
            };
            callback("1"); // 1代表删除数据成功了
            console.log("删除数据成功了~");
            db.close();
        });
    });
}

exports.getStudents=getStudents;
exports.save=save;
exports.remove=remove;