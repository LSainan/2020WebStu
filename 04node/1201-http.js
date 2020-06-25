let http=require('http')
let server = http.createServer((req,res)=>{
    res.writeHead(200, {"content-type":"text/html;charset=utf-8"});
    res.write("<h2>hello 浏览器 99999999 ~</h2>");
    res.end();
});
// 绑定端口号，启动服务器
server.listen(8888)