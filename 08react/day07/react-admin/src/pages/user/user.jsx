import React,{ Component } from 'react'
import { Card,Button,Table,Modal } from 'antd'

import {formatDate} from '../../utils/dateUtils'
import { PAGE_SIZE} from '../../utils/constants'
import LinkButton from '../../components/link-button'
import {reqAddOrUpdateUser,reqUser,reqDeleteUser} from '../../api/index'
import UserForm from './user-form'


export default class User  extends Component{
    state={
        users:[],//所有用户列表
        roles:[],//所有角色列表
        isShow:false,
        isLoading:false
    }
    //   初始化table列数组
  initColumn = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: create_time => formatDate(create_time)
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
      },
      {
        title: '操作',
        render: (role) => (
            <span>
                <LinkButton style={{ marginRight: '10px' }} onClick={() => { this.UpdateRole(role) } }>修改</LinkButton>
               <LinkButton onClick={() => { this.deleteRole(role) }}>删除</LinkButton>
            </span>
        )
      },
    ]
  }
// 获取用户列表
getUsers = async ()=>{
   const result= await reqUser()
  //  console.log(result)
   if(result.data.status===0){
       const users=result.data.data
       const roles=users.roles
      //  console.log(users)
    this.setState({
        users:users.users,
        roles
    })
   }
}
// 创建修改用户
AddOrUpdateUser=async ()=>{
 const result= await reqAddOrUpdateUser
}
componentDidMount(){
this.getUsers()
}
componentWillMount(){
    this.initColumn()
}
    render(){
        const { users,roles,isShow,isLoading } = this.state
        const title = (
            <Button type='primary' onClick={() => this.setState({ isShow: true })}>
              创建用户
            </Button>
          )
        return(

          <Card title={title}>
              <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
  <Modal
          title={!users._id?'添加用户':'更改用户'}
          visible={isShow}
          onOk={this.AddOrUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false })
            this.form.resetFields()
          }}
        >
          <UserForm
            setForm={(form) => this.form = form}
          />
        </Modal>
          </Card>
        )
    }
}