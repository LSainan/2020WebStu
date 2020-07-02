// 把请求接口全部封装成函数 目的：请求一个接口就像调用一个函数一样
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';
// let BASE_URL='http://localhost:5000';
// 变空请求本地3000
let BASE_URL = '';
// 函数调用
// export function reqLogin(){
// return ajax(BASE_URL+'/login',{username,password},'POST')
// }
// 1)登录 简写并导出 调用一个ajax得到一个promise
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', { username, password }, 'POST')

// 2) 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', { parentId })

// 3)添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE_URL + '/manage/category/add', { parentId, categoryName }, 'POST')


// 4)更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE_URL + '/manage/category/update', { categoryId, categoryName }, 'POST')


// 天气
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            if (data.status === 'success') {
                // 解构赋值
                let { dayPictureUrl, weather } = data.results[0].weather_data[0];
                // console.log(dayPictureUrl,weather)
                resolve({ dayPictureUrl, weather })
                // message.success('获取天气成功~')
            } else {
                message.error('获取天气失败~')
            }

        })
    })
}
// 10). 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', { pageNum, pageSize }, 'GET')//GET可以省略

// 11).根据ID/Name 搜索产品分页列表
export const reqSearchProducts=(pageNum,pageSize,searchName,searchType)=>ajax(BASE_URL + '/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
// 对商品进行上架/下架处理

export const reqUpdateStatus = (productId, status) => ajax(BASE_URL + '/manage/product/updateStatus', { productId, status }, 'POST')//GET可以省略
// 9 根据分类ID获取分类
export const reqCategory=(categoryId)=>ajax(BASE_URL + '/manage/category/info', { categoryId }, 'GET')