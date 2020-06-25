// ========================== 简洁的写法~
let http = require('http');
let server = http.createServer((req,res)=>{
    res.writeHead(200, {"content-type":"text/html;charset=utf-8"});
    res.write("<h2>hello 浏览器 9990 ~</h2>");
    res.end();
});
server.listen(9000);