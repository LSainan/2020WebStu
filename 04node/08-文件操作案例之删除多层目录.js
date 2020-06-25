// 针对删除多层目录操作 一般都会统一使用同步的api
let fs=require('fs');
let path=require('path')
// 删除多层目录
function removeDir(dir){
    let files=fs.readdirSync(dir);
    // console.log(files)
    files.forEach(file=>{
        let filename=path.join(dir,file)
        let stats=fs.statSync(filename);
        if(stats.isFile()){
            console.log('是文件...')
            // 删除文件
            fs.unlinkSync(filename);
            console.log(`删除文件${filename}成功...`)
        }else{
            //是目录 递归调用removeDir
            removeDir(filename)
        }
    })
    // 删除空目录
    fs.rmdirSync(dir)
    console.log(`删除目录${dir}成功...`)
}
removeDir("myapp")