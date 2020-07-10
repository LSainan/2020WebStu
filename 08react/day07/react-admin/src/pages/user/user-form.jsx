import React, { PureComponent } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const { Item } = Form;
const { Option } = Select;
class UserForm extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired,//接收父组件传过来的setForm函数
        roles: PropTypes.array.isRequired,//接收父组件传来的角色列表
        user: PropTypes.object.isRequired,//接收父组件传来的用户信息，用于展示在修改用户时的表单中
    }
    componentWillMount() {
        this.props.setForm(this.props.form)////把当前页面的form通过setForm函数传到父组件
    }
    render() {
        //双向数据绑定 form组件的获取表单验证函数
        const { getFieldDecorator } = this.props.form;
        //表单样式控制
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const { user, roles } = this.props
        return (
            //  表单样式控制 {...formItemLayout}
            <Form {...formItemLayout}>
                <Item label='用户名'>
                    {getFieldDecorator('username', {
                        initialValue: user.username,
                        rules: [{ required: true, message: '用户名必须输入' },
                        { min: 4, max: 12, message: '用户名必须大于4位小于12位' }]
                    })(
                        <Input type="text" placeholder="请输入用户名" />
                    )
                    }
                </Item>
                {
                    !user._id ?
                        (
                            <Item label='密码'>
                                {getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '密码必须输出' },
                                    { min: 4, max: 12, message: '密码必须大于4位小于12位' }
                                    ]
                                })(<Input type='password' placeholder='请输入密码' />)}
                            </Item>
                        ) : null
                }
                <Item label='手机号'>
                    {getFieldDecorator('phone', {
                        initialValue: user.phone,
                        rules: [
                            { required: true, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' },
                        ]
                    })(<Input type='number' placeholder='请输入手机号' />)}
                </Item>
                <Item label='邮箱'>
                    {getFieldDecorator('email', {
                        initialValue: user.email,
                        rules: [
                            {
                                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                message: '邮箱格式不正确'
                            },
                            { max: 50, message: '邮箱不得超过50字符' },
                        ]
                    })(<Input type='email' placeholder='请输入邮箱' />)}
                </Item>
                <Item label='角色'>
                    {getFieldDecorator('role_id', {
                        rules: [{ required: true, message: '角色必须选择' }],
                        initialValue: user.role_id,//展示修改的 user.role_id
                        //如果要让select的palceholder有效，此处不能写initialValue
                        //    initialValue: user.role_id
                    })(<Select placeholder="请选择角色">
                        {//把角色写入option中
                            roles.map(role => {
                                return <Option key={role._id} value={role._id}>{role.name}</Option>
                            })
                        }

                    </Select>
                    )}
                </Item>
            </Form>
        )
    }
}
//为当前组件添加一个form对象
export default Form.create()(UserForm)