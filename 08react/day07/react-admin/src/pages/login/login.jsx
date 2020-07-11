/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化1: 统一处理请求异常?
    在外层包一个自己创建的promise对象
    在请求出错时, 不reject(error), 而是显示错误提示
2. 优化2: 异步得到不是response, 而是response.data
   在请求成功resolve时: resolve(response.data)
 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message, Icon } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '../../api/index'
import memorySave from '../../utils/memorySave'
import localstorageSave from '../../utils/localstorageSave'
// 引入样式
import './login.less'
const Item = Form.Item // 不能写在import之前

class Login extends Component {
  handleSubmit = (event) => {
     // 阻止事件的默认行为
     event.preventDefault()
    // console.log('Received values of form: ', values);
    // let { username, password } = values;
    // 发送ajax请求,会有跨域(协议,域名,端口号),解决跨域 代理 webpack-dev-serve
    // reqLogin(username,password).then(response=>{
    //     console.log('成功了~',response)
    // }).catch(error=>{
    //     console.log('失败了~',error)
    // })
    // 改写一:
    //   const response= await reqLogin(username,password);
    //   console.log('成功了~',response.data)
    //   使用try catch 捕获错误(针对async和await)
    // try{
    //     const response= await reqLogin(username,password);
    //     console.log('成功了~',response.data)
    // }catch(error){console.log('失败了~',error)}
    // 不使用try catch 可以封装ajax统一处理失败
    // 如果统一处理了就是使用async和await,不使用try catch
    this.props.form.validateFields(async(err,values)=>{
      // 检验成功
      if(!err){
         // console.log('提交登陆的ajax请求', values)
        //  请求登录
      const { username, password } = values;
      const response = await reqLogin(username, password);
      // console.log('成功了~',response.data)
      let res = response.data
      if (res.status === 0) {
        //用户名和密码正确 跳到后台首页面
        message.success('登录成功')
        // console.log(res.data)
        // res.data是用户信息，保存用户信息，问？用户信息保存在哪？（redux/变量(内存，刷新就没了)/本地(一直存在)）
        // 内部和本地都存储 保存到一个变量里面 建上一个公共模块 utils/memorySave
        memorySave.user = res.data//保存用户信息到内存
        localstorageSave.saveUser(res.data);//保存用户信息到本地localstorage

        // 看是否有history 点react
        this.props.history.replace('/')

      } else {
        //登录失败 失败弹框 antd中有一个message
        message.error(res.msg)
      }
      }
    })

  };
 /*
  对密码进行自定义验证
  */
  /*
   用户名/密码的的合法性要求
     1). 必须输入
     2). 必须大于等于4位
     3). 必须小于等于12位
     4). 必须是英文、数字或下划线组成
    */
   validatePwd = (rule, value, callback) => {
    // console.log('validatePwd()', rule, value)
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
    // callback('xxxx') // 验证失败, 并指定提示的文本
  }

  render() {
    // 判断是否已经登录,如果登录自动跳转到后台首页面
    // 从内存中拿到user 拿到之后判断
    let user = memorySave.user;
    if (user && user._id) {
      // this.props.location.replace('/')
      // 一定记得return不能少
      return <Redirect to="/"></Redirect>
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login'>
        <header>
          <h1>商品后台管理系统</h1>
        </header>
        <section>
          <h1>用户登陆</h1>
          <Form
            name="normal_login"
            className="login-form"
            onSubmit={this.handleSubmit}
          >
            <Item>
              {
                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                  // initialValue: 'admin', // 初始值
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }

            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Item>


            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
        </Button>

            </Item>
          </Form>
        </section>

      </div>
    )
  }
}
export default Form.create()(Login)
