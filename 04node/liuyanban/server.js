let http = require('http')
let path = require('path')
let url = require('url');
let fs = require('fs');
let qs = require('querystring')
let ejs=require('ejs')
http.createServer((req,res) => {
    let realUrl = 'http://' + req.headers.host + req.url;
    let urlObj = url.parse(realUrl)
    switch (urlObj.pathname) {
        case '/':
            // =====================仅仅是返回html 数据是死数据
            // fs.readFile('index.html', 'utf-8', (err, data) => {
            //     if (err) throw err
            //     res.end(data)
            // })
            // break;
            // ================
            // ==========使用模板引擎 把死数据换成真实的数据
            // 把服务端的index.html和data.json绑定在一起，把数据渲染好再给浏览器
            let arr=[];
            if(fs.existsSync('data.json')){
                arr=require('./data.json')
            }
            // 第一个参数是html文件 第2个参数是对象
            ejs.renderFile('index.html',{msgs:arr},(err,html)=>{
                if(err) throw err
                res.end(html)
            })
        break;
        case '/dopublish':
            // 得到客户端提交过来的数据 data end
            //
            let data = '';//装客户端传递过来的数据
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', () => {
                // ==================可以实现写入，但是后面写入的内容会覆盖
                //    let msg= qs.parse(data)
                // //    console.log(msg)
                // // 给msg添加一个时间的字段
                // msg.time=new Date().toLocaleString();
                // // console.log(msg)
                // // data保存在data.json 数据一定要是一个字符串
                // // writeFile具有覆盖性
                // fs.writeFile("data.json",JSON.stringify(msg),"utf8",(err)=>{
                //     if(err) throw err;
                //     console.log("保存留言成功了~")
                // })
                // ====================核心代码
                let arr=[];
                let msg = qs.parse(data);
                msg.time = new Date().toLocaleString();
                if (fs.existsSync('data.json')) {
                    arr=require('./data.json')
                }
                arr.unshift(msg);
                fs.writeFile('data.json', JSON.stringify(arr), (err) => {
                    if (err) throw err
                    // console.log('保存留言成功了')
                    res.writeHead(200,{"content-type":'text/html;charset=utf8'})
                    res.end("<h1>发表留言成功了，<a href='/'>返回/查看所有留言</a></h1>")
                })
            })
            // 数据应该保存在什么地方
            // 数据渲染到页面中 模板引擎ejs
            break;
        default:
            let filename = path.join(__dirname, urlObj.pathname)
            if (fs.existsSync(filename)) {
                fs.readFile((filename), (err, data) => {
                    if (err) throw err;
                    res.end(data);
                })
            } else {
                res.end()
            }
    }
}).listen(3000, () => {
    console.log("3000,Running...")
})