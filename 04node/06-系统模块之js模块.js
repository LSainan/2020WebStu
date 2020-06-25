// ==================目录操作 创建 读取 删除
// -----------mkdir 创建目录
// let fs=require('fs');
// fs.mkdir('src',(err)=>{
//     if(err)throw err;
//     console.log('创建目录成功...')
// })
// ----------
// 不能一次创建多层目录
// let fs=require('fs')
// fs.mkdir("app/src",err=>{
//     if(err)throw err;
//     console.log('创建目录成功')
// })
// no such file or directory,
// ----------先创建src，再创建app
// let fs=require('fs')
// fs.mkdir('src/app',err=>{
// if(err)throw err
// console.log("创建目录成功了")
// })
// ============rmdir 删除目录
// let fs=require('fs');
// fs.rmdir('src',(err)=>{
//     if(err)throw err;
//     console.log("删除目录成功...")
// })

//===========readdir 读取文件
// let fs=require('fs');
// fs.readdir("myapp",(err,data)=>{
//     if(err)throw err;
//     console.log(data);//读取成功后的数据
//     // 读取文件夹和文件的名称然后放到数组中
//     // [ 'css', 'index.html', 'js' ]
// })