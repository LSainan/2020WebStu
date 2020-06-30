import store from 'store'
// 在外面定义一个常量 常量通常大写
const USER='USER'
// store包 安装：yarn add store 不是redux的store 里面封装看LocalStorage中的操作 在github搜索
export default{
    //保存user 传上一个user才能保存 对象转成一个字符串
    saveUser(user){
        // localStorage.setItem(USER,JSON.stringify(user))
        store.set(USER,user)
    },
    // 获取user 调用get方法需要返回 通常拿到的是字符串，需要转成对象
    getUser(){
        // return  JSON.parse(localStorage.getItem(USER)||'{}')
        // 获取需要返回
       return store.get(USER)
    },
    // 删除user
    removeUser(){
        //   localStorage.removeItem(USER)
        store.remove(USER)
    }
}