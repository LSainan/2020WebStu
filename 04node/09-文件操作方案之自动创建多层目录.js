let fs=require('fs')
let path=require('path')
// 创建多层目录 同步
function mkdirs(dir) {
    if (fs.existsSync(dir)) {
      return true;
    } else {
      if (mkdirs(path.dirname(dir))) {
        fs.mkdirSync(dir);
        return true;
      }
    }
  }
  //   创建文件
mkdirs('myapp/css')
mkdirs('myapp/js')
mkdirs('myapp/imgs')
  fs.writeFile('myapp/index.html',"<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Document</title></head><body></body></html>",err=>{
    if(err)throw err
    console.log("创建成功...")
})


