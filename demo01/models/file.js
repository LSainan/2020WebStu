// 一般操作数据库 专门放到models文件夹中
let fs = require('fs');
let baseurl = './data'
// cai是用户的数据 人家需要在传递一个callback
exports.save = function (shoujihao, cai, callback) {
    // 保存数据
    fs.writeFile(baseurl + '/' + shoujihao + '.txt', cai, callback)
}
// 保存订单到文件中
// 获取所有的订单信息(手机号)
exports.getAllFilesName = (callback) => {
    // console.log(callback)
    fs.readdir(baseurl, function (err, filenameArray) {
        if (err) {
            throw new Error('读取订单清单错误~')
        } else {
            // console.log(filenameArray)
            var resultArr = [];//不带txt
            for (let i = 0; i < filenameArray.length; i++) {
                //    console.log( filenameArray[i])
                filenameArray[i].substr(0, filenameArray[i].length - 4)
                // console.log( filenameArray[i].substr(0,filenameArray[i].length-4))
                resultArr.push(filenameArray[i].substr(0, filenameArray[i].length - 4))
            }
        }
        // console.log(resultArr)
        callback(resultArr)
    })
}
// getAllFilesName(); //写好后，先测试一下，测试一个函数也叫单元测试

/** 读取某个订单的数据 */
exports.read = (shoujihao, callback) => {
    fs.readFile(baseurl + '/' + shoujihao + '.txt', function (err, data) {
        if (err) {
            // throw err
            callback(-1)
            return;
        } else {
            callback(data)
        }
    })
}