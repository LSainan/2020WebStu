let http = require('http');
let path = require('path')
let url = require('url')
let fs = require('fs')
http.createServer((req, res) => {
    let realUrl = "http://" + req.headers.host + req.url;
    let urlObj = url.parse(realUrl)
    // res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    switch (urlObj.pathname) {
        case "/":
            fs.readFile("index.html", 'utf-8', (err, data) => {
                if (err) throw err
                res.end(data)
            })
            break;
        default:
            let filename = path.join(__dirname, urlObj.pathname)
            if (fs.existsSync(filename)) {
                fs.readFile(filename, (err, data) => {
                    if (err) throw err;
                    res.end(data);
                })
            } else {
                res.end();
            }
            break;
    }
}).listen(3000, () => {
    console.log('服务器在3000端口启动了...')
})