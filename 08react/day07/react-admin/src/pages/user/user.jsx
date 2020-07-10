import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'

import { formatDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/link-button'
import { reqAddOrUpdateUser, reqUser, reqDeleteUser } from '../../api/index'
import UserForm from './user-form'


export default class User extends Component {
  state = {
    users: [],//所有用户列表
    roles: [],//所有角色列表
    isShow: false,
    isLoading: false
  }
  // 根据角色的数组生成一个包含所有角色名的对象容器
  //把状态里的roles[]数据转换成以role._id为键名，role.name为键值的字典
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    //保存到this
    this.roleNames = roleNames
  }
  //   初始化table列数组
  initColumns = () => {
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
        // render: create_time => formatDate(create_time)
        render: formatDate
      },
      {
        //【显示角色名】在状态的roles中找
        title: '所属角色',
        dataIndex: 'role_id',
        // render: value => this.roleNames[value]
        render: (role_id) => this.roleNames[role_id] //根据Id展示对应的角色名； 旧写法(role_id) => this.state.roles.find(role => role._id===role_id).name //name取自roles.name
      },

      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton style={{ marginRight: '10px' }} onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  // 点击删除用户
  deleteUser = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗？`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        // console.log(result)
        const data = result.data
        if (data.status === 0) {
          this.getUsers()
        }

      },
      // okCancel:()=>{}
    })
  }
  // 显示修改用户
  showUpdate = (user) => {
    // 保存user
    this.user = user//保存user到this
    this.setState({////显示更新表单弹窗
      isShow: true
    })
  }
  // 获取用户列表
  getUsers = async () => {
    const result = await reqUser()
    //  console.log(result)
    const res = result.data
    // console.log(res)
    if (res.status === 0) {
      const { users, roles } = res.data
      // console.log(users,roles)
      // 初始化生成一个包含所有角色名的对象容器
      this.initRoleNames(roles)
      this.setState({
        users,
        roles,
      })
    }
  }
  // 显示添加用户
  showAddUser = () => {
    this.user = null//清除修改时建立的user防止点修改后再点添加 其表单信息依然存在
    this.setState({
      isShow: true
    })
  }
  // 创建添加修改用户
  AddOrUpdateUser = async () => {

    //表单验证是否通过函数
    this.form.validateFields(async (err, values) => {
      if (!err) {//如果本地表单验证通过
        this.setState({ isShow: false }) //关闭弹窗
        //1.收集表单数据
        const user = values
        console.log(user)
        //重要：如果是修改（判断user是否存在 ）则要把user._id也传过去有_id才被认为是更新用户，否则就是添加了
        if (this.user) {
          user._id = this.user._id
        }
        this.form.resetFields() //清空表单方便下次使用

        //2.提交表单
        const result = await reqAddOrUpdateUser(user)
        // console.log(result)
        const data = result.data
        //3.更新列表
        if (data.status === 0) {//显示对应提示
          message.success(`${this.user ? '修改' : '添加'}用户成功`)
          this.getUsers() //更新用户列表

        }
      }
    })

    // !!获取表单数据
    // const user = this.form.getFieldsValue();
    // // 重置表单 清空表单方便下次使用
    // this.form.resetFields()
    // if (this.user) {
    //   user._id = this.user._id
    // }
    // this.setState({
    //   isShow: false
    // })
    // const result = await reqAddOrUpdateUser(user)
    // // console.log(result)
    // const res = result.data;
    // if (res.status === 0) {
    //   this.getUsers()
    // }
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getUsers()
  }

  render() {
    const { users, roles, isShow, isLoading } = this.state;
    //非常重要：让user=修改的user或 添加用户时的空对象，否则添加、修改用户用同一窗口,添加用户时会出错，找不到user发生
    const user = this.user || {};
    //非常重要：把onclick改为一个单独函数，用来清除修改时建立的user;
    //卡片标题部分显示Modal弹窗onClick={()=>this.setState({isShow:true})}
    const title = (
      <Button type='primary' onClick={this.showAddUser}>
        创建用户
      </Button>
    )
    return (

      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        {/*  引入UserForm组件 并把函数 form =>this.form=form 传过去（用于接收子组件传过来的form） */}
        <Modal
          title={users._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.AddOrUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false })
            this.form.resetFields()
          }}
        // onOk={this.handleOk}
        >
          <UserForm
            setForm={(form) => this.form = form}//把函数传给子组件，接收其form相关功能
            user={user}//把user字典传到子组件中，方便其显示在表单对应用户信息
            roles={roles}//把roles角色传给子组件
          />
        </Modal>
      </Card>
    )
  }
}