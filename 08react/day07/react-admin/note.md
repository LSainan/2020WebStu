修改antd中的主题颜色：
    1）安装less  less-loader
        yarn add less less-loader
    2）找到webpack配置文件

配置如下：
const {override,fixBabelImports,addLessLoader} =require('customize-cra');
module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true,//自动打包相关的样式 默认为 style:'css'
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars:{'@primary-color':'#1DA57A'},
    })
);

一定要重启服务。


//高阶组件中的withRouter，作用是将一个组件包裹进Route里面，然后react-router的三个对象
history,location,match就会被放进这个组件的props属性中。
react-router-dom 里面是有这个组件的, 直接引入使用就可以了

import { Link, withRouter } from 'react-router-dom'
class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 有children
                return (
                    <SubMenu key={item.key} title={
                        <span> {item.title}</span>
                    }>

                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        // 得到请求的pathname
        let path = this.props.location.pathname
        return (
            <div style={{ width: 200 }}>
                <h1 style={{ color: '#fff', fontSize: '24px', margin: 0 }}>商品管理后台</h1>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark">
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)

所以withRouter的作用就是，如果我们想要跳转到某个页面需要依靠Routet，那么就可以使用withRouter组件进行包裹，实现我们想要的页面跳转。


 withRouter实现原理:
将组件包裹进 Route, 然后返回
 const withRouter = () => {
     return () => {
         return <Route component={Nav} />
     }
}

简写：
const withRouter = ( Component ) => () => <Route component={ Component }/>

后台退出按钮知识点：
vue组件里面写内容 会放到插槽的位置
react在组件中写数据，接收数据通过 this.props.children
...this.props 把对象展开，放了一个children 函数组件中没有this 就用...prpos
linkButton组件
内存上和硬盘上的用户信息都删除

后台头部知识点:
天气数据: http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
调用平台接口,程序员一般写的都是应用接口
要想到:URL 请求方式 get
问：都有什么方式可以发出请求
答：浏览器 img src/ a href/ script src/ ajax 爬虫 postman app...
天气接口：jsonp发出的请求
jsonp请求：
原理：通过动态添加script标签从而发送请求 src没有跨域 不是原生的ajax
(axios是对原生的ajax进行封装)
安装：yarn add jsonp   npm i jsonp -S


数据来源：
1）react组件有状态
2）redux
3）本地硬盘

创建一个独立的区域进行保存-->多个组件共享数据
没有共享直接放本组件
react中定义状态 state

时间戳 Data.now()
创建一个工具函数 formatDate格式化
组件中使用状态this.state.xxx
改变状态setState 定时器setInterval

钩子函数componentDisMount(){//发送ajax启动定时器

}
//===========商品分类页面
获取一级分类或某个二级分类列表
三个接口
拿到接口函数
1）状态管理机制 state
componentWillMOunt(){}钩子函数 即将挂载
componentDidMOunt(){}钩子函数 计时器，ajax请求
----------------------------------------------------------
//2020.6.30
商品管理：
    商品列表（查）
    添加商品（增）
    更新商品（改）
    删除商品（删）
    /product 商品列表 （有列表基本都有详情）
    /product/addupdate 添加商品(修改)
    /product/detail  商品详情
1、先准备组建
2、搭建路由，
//复习 受控表单和非受控表单
表单的非受控：会维持自身的状态，并根据用户的输入进行更新
文本框中的

在vue中，给表单双向绑定一个数据，data中的数据变了，输入框中的内容也变了
此时表单就受vue中的状态的控制
表单的值有react中的状态进行控制，使用状态进行控制的好处是确保react的单向数据流特性。
通常会把一个非受控制的表单（组件）转化为受控制的
拿状态this.state.xxx
修改状态 this.setState
e.target.value
怎么转化？ 只有状态改变了，输入框才改变
步骤：
1）先定义一个状态
2）表单中的数据由状态来决定
3）给表单绑定一个change事件 当用户输入了数据 会触发change事件
4）在change事件中修改状态 状态改变了 输入框的值也就改变了
//react 中的ajax
ajax发展史
1）
2）
3）
4）fetch 不是ajax但是也可以发送请求 和ajax是并行
react本身是构建用户界面的，不包含ajax请求。但是前端应用都需要ajax请求后台接口
//一个小案例 github github提供了一个接口 接口可以查询最受欢迎的库

//在vue中 ，是在created或者mounted钩子函数中发送请求

//在react中，也是有对应的钩子函数，叫componentDidMounted(){}钩子函数不要写成箭头函数的形式
它里面的钩子是正常的也是组件对象

//2020.7.1
商品上架和下架
1)接口函数 reqUpdateStatus
点击按钮选择下架还是上架 更新商品状态
onClick={()=>{this.UpdateStatus(product._id,product.status)}}
UpdateStatus=async (id,status)=>{
    let result=await reqUpdateStatus(id,status)
    if(result.data.status===0){
        message.success('更新成功')
        //重新获取商品的列表
        this.getProducts(this.pageNum)
    }
}
//商品的添加
add-update.jsx
import {Card,Input } from 'antd'
//获取一级或二级分类列表 请求接口拿到数据
getCategorys=async (parentId)=>{
    //parentId===0是一级分类数据
    const result=await reqCategorys(parentId);
    if(result.data.status===0){
        const categorys=result.data.data
        console.log(categorys)
        this.initOption(categorys);
        //什么时候获取分类数据 componentDidMount(){this.getCategorys() }
    }

}
//拿到接口 import {reqCategorys} from '../../api/index
//initOption label 给用户看的 value提交给服务器
initOption=(categorys)=>{
    const options= categorys.map(c=>({
        value:c._id,
        label:c.name,
        isLeaf:false
    }))
    //console.log(options)
    //更新options状态
    this.setState({
        options
    })
}
//一级获取完成
//获取二级 loadData
//获取一级分类的_id
targetOption.value
//push的时候可以传参数
//product有值 修改商品
!!product 转成布尔值
//级联选择（重）
//浏览器中只能发送get请求

//添加商品，更新商品
//拼接 连个接口写成一个
