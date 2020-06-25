// ========================= 以下是对文件的操作

// -------------------------readFile 异步读取
// let fs=require('fs');
// console.log("任务X");
// 最早之前，异步使用回调函数实现
// fs.readFile('./name.txt','utf-8',(err,data)=>{
// console.log(data)
// })
// console.log('任务y')

// =================readFileSync 同步读取
// let fs=require('fs');
// console.log('任务x')
// let data=fs.readFileSync('./name.txt','utf-8');
// console.log(data)
// console.log("任务y")

// --------------writeFile 覆盖式写文件 异步
// let fs=require('fs');
// console.log('任务x')
// fs.writeFile('./age.txt',1000,(err,data)=>{
//     if(err) throw err
//     console.log(data)//undefined
// })

// --------------appendFile 追加式写文件 异步
// let fs=require('fs')
// // 异步靠回调
// fs.appendFile('./name.txt','xixi',(err,data)=>{
//     if(err){console.log(err)}
//     else{
//         console.log(data)//undefined
//     }
// })

// ----------------查看文件状态(属性)
// let fs=require('fs');
// // 异步靠回调函数
// fs.stat("./myapp",(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })//mode:16822
// mode: 33206 表示是一个普通的文件   16822 表示是一个目录 */

// -----------------删除文件 unlink
// let fs=require('fs');
// fs.unlink('./age.txt',(err,data)=>{
//     if(err) throw err
//     console.log("删除文件成功..")
// })

// --------------------------exists 判断文件是否存在
// let fs=require('fs');
// let r=fs.existsSync("./name.txt");
// console.log(r)//false 表示不存在 true表示存在

// ------------------使用绝对路径
let fs=require('fs')
let path=require('path');
// \n当成换行了
// let filename=__dirname+'\name.txt'//直接拼接
// console.log(filename)

let r=fs.existsSync(path.resolve(__dirname,'name.txt'));
console.log(r)

console.log(__dirname)
