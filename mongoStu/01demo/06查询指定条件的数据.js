let MongoClient=require('mongodb').MongoClient;
let url='mongodb://localhost:27017/';
MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
if(err) throw err
var dbo=db.db('runoob');
var whereStr={'name':'hanhan'}//查询条件
dbo.collection('site').find(whereStr).toArray(function(err,result){
    if(err) throw err
    console.log(result);
    db.close();
})
})