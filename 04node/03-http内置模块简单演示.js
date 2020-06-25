let http=require('http');
// 使用createServer用来创建一台服务器，把一个函数传到另一个函数中，里面的函数叫回调函数
// req包装请求相关的信息 res 包装响应了相关的信息
let server=http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.write('hello Lisainan');//响应数据给客户端(浏览器)
    res.end();//结束响应
});
//监听3000端口
server.listen(3000,()=>{
    console.log('服务器在3000端口启动....')
})