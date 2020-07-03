import React, { Component } from 'react'
import {Redirect, Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';

import memorySave from '../../utils/memorySave'
import Header from '../../components/header/index'
import LeftNav from '../../components/left-nav/index'
//
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {

    state = {
        collapsed: false,
    };

    render() {//render是渲染一个jsx
        let  user=memorySave.user
        // 判断有没有登录，也就是内存中有没有user
        if(!user||!user._id){
            //内存中没有用户信息，没有登录，跳转到登录页面
            // this.props.history.replace('/login')
            // 刷新之后就需要重新登录，因此还需要保存到本地 建一个utils/localStorageSave
            // return不能少
          return  <Redirect to='/login'></Redirect>
        }
        return (
            <Layout style={{ minHeight:'100%',width:'100%', margin: 0 }}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout style={{height:'100%',margin: '0' }}>
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: '#fff', margin: '20px'}}>

                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/bar' component={Bar}></Route>
                            <Route path='/line' component={Line}></Route>
                            <Route path='/pie' component={Pie}></Route>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'skyblue'}}>学习react，你看，我是底部，看见我了吗~</Footer>
                </Layout>
            </Layout>
        )

    }
}