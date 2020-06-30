// 对axios进行二次封装
// 1)
// export default function ajax(url, data = {}, type = "GET") {
//          // 分get请求和post请求
//     if (type === "GET") {
//         return axios.get(url,{
//             //通过params传参
//             params:data
//         })
//     }else{
//          return axios.post(url,data)
//     }

//     })
// 2)统一处理异常
// 地址,传参,方式 导出,就一个方法
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve,reject)=>{
        let promise;
         // 分get请求和post请求
    if (type === "GET") {
        promise= axios.get(url,{
            //通过params传参
            params:data
        })
    }else{
        promise=axios.post(url,data)
    }
    promise.then(response=>{
        //请求 成功
        resolve(response)
    }).catch(error=>{//请求失败
        message.error('请求出错了，请稍后再试~');
    })
    })
}
