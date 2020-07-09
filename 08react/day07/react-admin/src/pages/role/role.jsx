import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from "../../utils/constants"
import AddForm from './add-form'
import AuthForm from './auth-form'
import { formatDate } from '../../utils/dateUtils'
import memorySave from '../../utils/memorySave'
import {reqRoles, reqAddRole, reqUpdateRole } from '../../api'

/*
角色路由
 */
export default class Role extends Component {

  state = {
    roles: [], // 所有角色的列表
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
  }

  constructor (props) {
    super(props)
    this.authRef = React.createRef()//返回一个ref对象，可以在currentref 的属性处访问
  }

//   初始化table列数组
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: create_time => formatDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: auth_time => formatDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton>
      },
    ]
  }

//  显示权限设置界面
  showAuth = (role) => {
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }

//   异步获取角色列表显示
  getRoles = async () => {
    const result = await reqRoles()
    // console.log(result)
    if (result.data.status === 0) {
      const roles = result.data.data
      this.setState({
        roles:roles
      })
    }
  }

  /* =============添加角色 */
  addRole = () => {
    // 进行表单验证, 只能通过了才向下处理，promise中错误优先
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        this.setState({
          isShowAdd: false
        })

        // 收集输入数据
        // console.log(values)
        const { roleName } = values//把values结构赋值出来
        this.form.resetFields()//重置表单

        // ====请求添加角色reqAddRole(roleName)
        const result = await reqAddRole(roleName)
        console.log(result)
        // 根据结果提示/更新列表显示
        if (result.data.status === 0) {
          message.success('添加角色成功')
          // this.getRoles()
          // 新产生的角色
          const role = result.data.data
          // 更新roles状态
          /*const roles = this.state.roles
          roles.push(role)
          this.setState({
            roles
          })*/

          // 更新roles状态: 基于原本状态数据更新
          this.setState(state => ({
            roles: [...state.roles, role]
          }))

        } else {
          message.error('添加角色失败')
        }
      }
    })
  }

  /*
  给角色授权
   */
  updateRole = async () => {
    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })

    const role = this.role
    // 得到最新的menus
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memorySave.user.username

    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      message.success('设置角色权限成功')
      this.setState({
        roles: [...this.state.roles]
      })
    }
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, isShowAdd, isShowAuth } = this.state
    const role = this.role || {}

    const title = (
      <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>
        创建角色
      </Button>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    )
  }
}
