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
// 2）添加用户 // 3）更新用户
//添加/修改用户(如果存在._id说明是更新就用update拼接路径，否则就是添加用户)
export const reqAddOrUpdateUser=(user)=>ajax(BASE_URL+'/manage/user/'+(user._id?'update':'add'),user,'POST')

// export const reqAddOrUpdateUser=(user)=>ajax(BASE_URL+'manage/user/'+(user._id?'update':'add'),user,'post')


// 4）获取所有用户列表
export const reqUser=()=>ajax(BASE_URL+'/manage/user/list','GET')
// 5）删除用户
export const reqDeleteUser=(userId)=>ajax(BASE_URL+'/manage/user/delete',{userId},'post')
// 6) 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', { parentId })

//7)添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE_URL + '/manage/category/add', { parentId, categoryName }, 'POST')


// 8)更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE_URL + '/manage/category/update', { categoryId, categoryName }, 'POST')

// 9 根据分类ID获取分类
export const reqCategory = (categoryId) => ajax(BASE_URL + '/manage/category/info', { categoryId }, 'GET')

// 10). 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', { pageNum, pageSize }, 'GET')//GET可以省略

// 11).根据ID/Name 搜索产品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => ajax(BASE_URL + '/manage/product/search', { pageNum, pageSize, [searchType]: searchName })

// 12） 添加商品
export const reqUpdateStatus = (productId, status) => ajax(BASE_URL + '/manage/product/updateStatus', { productId, status }, 'POST')//GET可以省略
// 13）更新商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE_URL +' /manage/product/'+(product._id? 'update' : 'add'), product, 'POST')

// 14）对商品进行上架/下架处理

// 15）上传图片
// upLoad组件已经上传....

// 16)删除图片
export const reqDeleteImg = (name) => ajax(BASE_URL + '/manage/img/delete', { name }, 'POST')
// 17）添加角色
export const reqAddRole=(roleName)=>ajax(BASE_URL+'/manage/role/add',{roleName},"POST")
// 18）获取角色列表
export const reqRoles=()=>ajax(BASE_URL+'/manage/role/list',"GET")
// 19）更新角色（给角色设置权限）
export const reqUpdateRole=(role)=>ajax(BASE_URL+'/manage/role/update',role,"POST")
// 20） 天气，获取天气信息
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {

            if (data.status === 'success') {
                // 解构赋值
                let { dayPictureUrl, weather } = data.results[0].weather_data[0];
                // console.log(dayPictureUrl,weather)
                resolve({ dayPictureUrl, weather })
                message.success('获取天气成功~')
            } else {
                message.error('获取天气失败~')
            }

        })
    })
}
