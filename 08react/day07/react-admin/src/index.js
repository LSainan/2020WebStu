/* 打包入口  */
import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App.jsx"

import memorySave from './utils/memorySave';
import localstorageSave from './utils/localstorageSave';

const user = localstorageSave.getUser()//获取硬盘上的信息
memorySave.user = user;//将硬盘上的user信息赋值内存中的user

// 渲染组件
ReactDOM.render( <App />,document.getElementById('root'))

