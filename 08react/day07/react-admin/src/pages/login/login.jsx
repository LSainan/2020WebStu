import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message ,Icon} from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '../../api/index'
import memorySave from '../../utils/memorySave'
import localstorageSave from '../../utils/localstorageSave'
// 引入样式
import './login.less'

export default class Login extends Component {
    onFinish = async values => {
        // console.log('Received values of form: ', values);
        let { username, password } = values;
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
        const response = await reqLogin(username, password);
        //   console.log('成功了~',response.data)
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
    };
    render() {
        // 判断是否已经登录,如果登录自动跳转到后台首页面
        // 从内存中拿到user 拿到之后判断
        let user = memorySave.user;
        if (user && user._id) {
            // this.props.location.replace('/')
            // 一定记得return不能少
            return <Redirect to="/"></Redirect>
        }
        return (
            <div className='login'>
                <header>
                    <h1>商品后台管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        initialValues={{ remember: true }}

                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' },
                            {
                                max: 14,
                                message: '用户最长数字为14'
                            },
                            {
                                min: 5,
                                message: '用户密码最短为5'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_-]/,
                                message: '用户名必须是（字母，数字，下划线，减号）'
                            }
                            ]}
                        >
                            <Input prefix={<Icon type="user" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
        </Button>

                        </Form.Item>
                    </Form>
                </section>

            </div>
        )
    }
}
