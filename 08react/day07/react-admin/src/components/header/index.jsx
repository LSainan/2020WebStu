import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from '../link-button'
import { formatDate } from '../../utils/dateUtils'
import memorySave from '../../utils/memorySave'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import localstorageSave from '../../utils/localstorageSave'

import "./index.less"


 class Header extends Component {
  state = {
    currentTime: formatDate(Date.now()),//当前的时间字符串
    dayPictureUrl: '',
    weather: ''
  }
  // 获取Title
  getTitle=()=>{
    let path=this.props.location.pathname;
    let title='';
    menuList.forEach(item=>{
      if(item.key===path){
        title=item.title;
      }else if(item.children){
        let cItem=item.children.find(cItem=>cItem.key===path);
        if(cItem){
          title=cItem.title
        }
      }
    })
    return title;
  }
  // 退出登录
  logout=()=>{
    Modal.confirm({
      content:'你确定要退出吗？',
      onOk:()=>{
        // 确认 删除本地和内存的用户信息 值为空
        memorySave.user={};
        // 本地有一个封装好的删除方法直接调用
        localstorageSave.removeUser()
        // 退出之后跳转到登录页面
        this.props.history.replace('/login')
      },
      onCancel(){
        // alert('取消')
      }
    })
  }
  // 获取天气 async await
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('郑州');
    this.setState({ dayPictureUrl, weather })
  }
  // 定时器
  getTime = () => {
    setInterval(() => {
      const currentTime = formatDate(Date.now())
      // 改变状态
      this.setState({ currentTime })
    }, 1000);
  }
  //启动计时器，发送ajax请求 状态发生改变重新渲染
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }
  render() {
    // 调用getTitle
    let title=this.getTitle()
    const { dayPictureUrl, weather } = this.state;
    const username = memorySave.user.username
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)