// 向外暴露一个函数 控制器
// 保存数据,专门放到其他文件
/*
显示首页面
*/
let file=require('../models/file')
exports.showIndex=(req,res)=>{//渲染首页面
    // 渲染的话是渲染一个模板 ejs
    // 这里的xxx会默认去找views下面的xxx.ejs这个页面
    res.render("index")//render可以渲染页面
}
// 保存订单信息
// 还可以向外暴露很多东西
exports.save=(req,res)=>{//接收并保存客户端传来的数据
// console.log(req.body)
// save方法
file.save(req.body.shoujihao,req.body.cai,(err)=>{
    if(err){
        res.send('-1');
    }else{
        res.send('1')
    }
})
}
/*
查看所有订单信息
*/
exports.allorder=(req,res)=>{
    file.getAllFilesName(function(arr){
       // 把模板数据进行绑定 把数据融合到模板中
res.render('allorder',{
    'allOrder':arr
})

    })

}
/*
查看某个用户订单信息
*/
exports.oneorder=(req,res)=>{
    // 得到get请求携带的数据
    let shoujihao=req.params.shoujihao;
    // console.log(shoujihao)
    // 根据手机号去data中去找数据 对data的操作 models
    file.read(shoujihao,function(cai){
        // console.log(cai)
if(cai==-1){
    cai='没有找到'
}
res.render('oneorder',{
    'shoujihao':shoujihao,
    'cai':cai
})
    });

}
