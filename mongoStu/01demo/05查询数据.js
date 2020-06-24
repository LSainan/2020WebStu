let MongoClient=require('mongodb').MongoClient;
let url='mongodb://localhost:27017/';
MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
    if(err)throw err;
    var dbo=db.db('runoob');
    dbo.collection('site').find({}).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    })
})