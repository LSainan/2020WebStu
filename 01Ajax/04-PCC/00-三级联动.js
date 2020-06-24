let express=require('express');
let path=require('path')
let fs=require('fs')
let app=express()
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'00-三级联动.html'))
} )
// 获取所有省份
app.get('/province',function(req,res){
    fs.readFile('cityData.min.json','utf-8',function(err,data){
        if(err){
            console.log(err)
        }else{
            let cityObj=JSON.parse(data);
            let province=[];
            cityObj.forEach(function(item){
                province.push(item.n);
            })
            console.log(province);
            res.json(province)
        }
    })
})
// 获取所有的市
app.get('/city',function(req,res){
    let province=req.query.province
    fs.readFile('cityData.min.json','utf8',function(err,data){
        if(err){
            console.log(err)
        }else{
            let cityObj=JSON.parse(data);
            let city=[];
            //
            cityObj.forEach(function(item){
                if(item.n==province){
                    item.s.forEach(function(item1){
                        city.push(item1.n);
                    })
                }

            })
            console.log(city);
            res.json(city)
        }
    })
})
// 获取所有的区
app.get('/country',function(req,res){
    let city=req.query.city
    fs.readFile('cityData.min.json','utf-8',function(err,data){
        if(err){
            console.log(err)
        }else{
            let cityObj=JSON.parse(data);
            let country=[];
            //
            cityObj.forEach(function(item){
                item.s.forEach(function(item1){
                    if(item1.n==city){
                        item1.s.forEach(function(item2){
                            country.push(item2.n);
                        })
                    }
                })
            })
            // console.log(country);
            res.json(country)
        }
    })
})
app.listen(3000,()=>{
    console.log('3000 Running~')
})