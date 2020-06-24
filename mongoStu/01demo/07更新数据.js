let MongoClient=require('mongodb').MongoClient;
let url='mongodb://localhost:27017/';
MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
    if(err) throw err
    let dbo=db.db('runoob');
    let whereStr={'name':'hanhan'}//查看数据
    let updataStr={$set:{'url':'https://www.runoob.com'}};
    dbo.collection('site').updateOne(whereStr,updataStr,function(err,res){
        if(err) throw err
        console.log('文档更新成功');
        db.close();
    })
})