// M告诉c是否插入成功,前两行代码是固定死的 cats.js需要导入一个models
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID//得到Object类型
var url = "mongodb://localhost:27017/wc_blog";
// 插入分类数据
function insertCats(data, callback) {
    // 看一下data是否能拿到
    // console.log(data)//[Object: null prototype] { ctitle: '学习类', csort: '2' }
    // model拿到数据了，连接数据库
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        // var myobj = { name: "菜鸟教程", url: "www.runoob" };
        dbo.collection("cats").insertOne(data, function (err, res) {
            if (err) {
                console.log('插入数据失败了');
                callback('-1')//-1代表失败了
            } else {
                callback('1') //成功了调用函数，也就是cat.js 3）向数据库插入数据的function
                // callback('插入数据成功了<a href="/admin/cats">查看分类列表</a>')
                console.log("插入数据成功了");
                db.close();
            }

        });
    });
}
// 获取分类的数据
function getAllCats(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("cats").find({}).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result);//数据传给控制器
            db.close();
        });
    });
}
// 根据id得到分类
function getCatsById(id, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("cats").find({ '_id': ObjectId(id) }).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result);//数据传给控制器
            db.close();
        });
    });
}
//根据ID完成分类更新的操作
function updateCatsById(data, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = { _id: ObjectId(data.id) };  // 查询条件
        console.log(whereStr)
        var updateStr = { $set: { "ctitle": data.ctitle, "csort": data.csort } };
        // console.log(updateStr)
        dbo.collection("cats").updateOne(whereStr, updateStr, function (err, res) {
            if (err) callback("-1");
            // console.log("文档更新成功");
            callback("1")
            db.close();
        });
    });
}
// 根据ID完成分类删除操作
function deleteCatsById(id, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = { "_id": ObjectId(id) };  // 查询条件
        console.log(whereStr)
        dbo.collection("cats").deleteOne(whereStr, function (err, res) {
            if (err) callback("-1");
            callback("1")
            // console.log("文档delete成功");
            db.close();
        });
    });
}
// 登录
function findUser(user, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = user;  // 查询条件
        dbo.collection("users").find(whereStr).toArray(function (err, result) {
            if (err) throw err;
            // 把结果给C
            callback(result);
            db.close();
        });
    });
}
// 保存文章
function saveArticle(post, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("posts").insertOne(post, function (err, res) {
            if (err) callback("-1");
            callback("1")
            // console.log("文章插入成功");
            db.close();
        });
    });
}
// 获取所有文章
function getAllArticles(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("posts").find({}).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result);//数据传给控制器
            db.close();
        });
    });
}
// 根据ID去找文章
function getArticleById(id, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("posts").find({ "_id": ObjectId(id) }).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result)
            db.close();
        });
    });
}
// 根据ID完成文章更新操作
function updatePostsById(data,callback){
    console.log(data)
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = { _id: ObjectId(data.id) };  // 查询条件
        console.log(whereStr)
        var updateStr = { $set: { "cat": data.cat, "title": data.title,"summary":data.summary,"content":data.content } };
        // console.log(updateStr)
        dbo.collection("posts").updateOne(whereStr, updateStr, function (err, res) {
            if (err) callback("-1");
            // console.log("文档更新成功");
            callback("1")
            db.close();
        });
    });
}
// 根据id完成文章的删除操作
function deletePostsById(id, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = { "_id": ObjectId(id) };  // 查询条件
        // console.log(whereStr)
        dbo.collection("posts").deleteOne(whereStr, function (err, res) {
            if (err) { callback("-1"); } else {
                console.log("文档delete成功");
                callback("1")
                db.close();
            }

        });
    });
}

//单元测试，看一下是否能得到分类的数据
// getAllCats();//
// getCatsById('5e7c4a479764a511dc21cb0d');//[]
/*
_id是一个字符串，但是在MongoDB数据库中，_id不是字符串，它的类型是ObjectId类型，
所以说需要把字符串_id转化成ObjectId这种类型
*/
// getCatsById('5e7c4a479764a511dc21cb0d');
// [ { _id: 5e7c4a479764a511dc21cb0d, ctitle: '学习类', csort: '1' } ]
// ===
// deleteCatsById('5e7c4a479764a511dc21cb0d')
// 登录单元测试
// [ { _id: 5e7b1b28716bc7466cc184d1, username: 'admin', pwd: 'admin' } ]
// findUser({username:'admin',pwd:'admin'})
//删除文章单元测试
// deletePostsById('5e7db8250be0b8212c597b7d')
// 根据id得到文章单元测试
// getArticleById("5e7de5576129954038f73076")
// 把数据返回给控制器
// 向外暴露

exports.insertCats = insertCats;
exports.getAllCats = getAllCats;
exports.getCatsById = getCatsById;
exports.updateCatsById = updateCatsById;
exports.deleteCatsById = deleteCatsById;
exports.findUser = findUser;
exports.saveArticle = saveArticle;
exports.getAllArticles = getAllArticles;
exports.getArticleById = getArticleById;
exports.deletePostsById = deletePostsById;
exports.updatePostsById = updatePostsById;

