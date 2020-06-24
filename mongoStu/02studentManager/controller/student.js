let db=require('../models/db')
exports.showIndexByEjs=(req,res)=>{
db.getStudents((arr)=>{
res.render('indexByEjs',{
    'arr':arr
})
})
}
// 渲染显示学生页面
exports.showIndexByAjax = (req,res)=>{
    res.render("indexByAjax");
}
// 增加学生
exports.add=(req,res)=>{
    res.render('add');
}
// 处理添加学生逻辑
exports.doadd=(req,res)=>{
    db.save(req.body,function(info){
        res.send(info)
    })
}
// 删除学生

// 开一个接口  所有学生的
exports.allstudent = (req,res)=>{
    db.getStudents(function(arr){
        res.json({"results":arr})
    });
}