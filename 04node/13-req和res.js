// -----------------res
// let http=require('http');
// http.createServer((req,res)=>{
// res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
// res.write('<h1>李赛男，你好...</h1>');
// res.end('xixi');
// }).listen(3000,()=>{
//     console.log('服务器在3000端口启动了..')
// })

// --------------------req
// let http=require('http');
// http.createServer((req,res)=>{
//     // console.log(req.httpVersion)
//     // console.log(req.headers)
//     // console.log(req.method);
//     // console.log(req.url)
//     let data='';
//     switch(req.url){
//         case '/':
//             data='<h1>首页面</h1>';
//             break;
//             case '/shop':
//                 data='<h1>购物车页面</h1>';
//                 break;
//             case '/order':
//                 data='<h1>订单页面</h1>';
//                 break;
//                 default:
//                     data='你的页面飞了...'
//     }
//     res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
//     res.write(data);
//     res.end();
// }).listen(3000,()=>{
//     console.log('服务器在3000端口启动了...')
// })

// --------------------------------url 模块 querystring模块
let http = require("http");
// node中提供了一个url模板，解析url
let url = require("url");  // url.parse()
let qs = require("querystring"); // 解析查询字符串
http.createServer((req, res) => {
    // console.log(req.url); // /  /shop   /list
    let urlObj = url.parse(req.url);
    // console.log(urlObj)

    // 解析查询字符串  urlObj.query
    let qObj = qs.parse(urlObj.query); // 解析查询字符串
    // console.log(qObj); // { a: '123' }  qObj.a

    let data = "";
    switch (urlObj.pathname) {
        case "/":
            data = "<h1>首页面</h1>";
            break;
        case "/shop":
            data = "<h1>购物车页面</h1>";
            break;
        case "/order":
            data = `<h1>订单页面，名字是${qObj.name}</h1>`;
            break;
        default:
            data = "你的页面飞了~"
    }
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    res.write(data);
    res.end();
}).listen(3000, () => {
    console.log("服务器在3000端口启动了~")
})