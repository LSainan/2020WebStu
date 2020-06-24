// let fs=require('fs');
// fs.readFile('./name.txt','utf-8',function(err,data){
// if(err) console.log(err);
// fs.readFile(data,'utf-8',function(){
//     if(err) console.log(err);
//     console.log(data)//age.txt
// })
// })
// ======================使用promise处理异步读取文件
// let fs=require('fs');
// let p=new Promise((resolve,reject)=>{
//     // 通常在执行器中写异步代码
//     fs.readFile('name.txt','utf-8',(err,data)=>{
//         if(err) reject(err)
//         resolve(data)
//     })
// });
// p.then((value)=>{
//     console.log(value),(reson)=>{
// console.log(reson)
//     }})//age.txt
// =============
// let p=new Promise((resolve,reject)=>{
//     // 写异步代码
//     setTimeout(()=>{
//         let n=Math.random();
//         if(n>0.5){
//             resolve('ok');
//         }else{
//             reject('no ok')
//         }
//     },1000)
// })
// p.then((value)=>{
//     console.log(value)
// },(reason)=>{
//     console.log(reason)
// })
// ===============
let fs=require('fs');
function readFile(file){
    return new Promise((resolve,reject)=>{
        fs.readFile(file,'utf8',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    });


    }

readFile('name.txt').then((value)=>{
    console.log(value)
},(reason)=>{
    console.log(reason)
})