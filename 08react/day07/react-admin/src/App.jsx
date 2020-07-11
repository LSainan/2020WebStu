import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import 'antd/dist/antd.less'

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import localstorageSave from './utils/localstorageSave'
import memorySave from './utils/memorySave'
//取localstorage中保存的user, 保存到内存中，用于login.jsx页面读取是否登录

const user = localstorageSave.getUser()
memorySave.user = user


class App extends Component {
    render() {
        return (

                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/" component={Admin}></Route>
                    </Switch>
                </BrowserRouter>
        )
    }
}
export default App
