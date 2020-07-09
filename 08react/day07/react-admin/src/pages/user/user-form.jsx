import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const { Item } = Form;
const { Option } = Select;
class UserForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        user: PropTypes.object,
        roles: PropTypes.object
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const { user, roles } = this.props
        return (
            <Form {...formItemLayout}>
                <Item label='用户名'>
                    {getFieldDecorator('username', {
                        initialValue: user.username
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
                                    initialValue: ''
                                })(<Input type='text' placeholder='请输入密码' />)}
                            </Item>
                        ) : null
                }
                <Item label='手机号'>
                    {getFieldDecorator('phone', {
                        initialValue: user.phone
                    })(<Input type='number' placeholder='请输入手机号' />)}
                </Item>
                <Item label='邮箱'>
                    {getFieldDecorator('email', {
                        initialValue: user.email
                    })(<Input type='text' placeholder='请输入邮箱号' />)}
                </Item>
                <Item label='角色'>
                    {getFieldDecorator('role_id ', {
                        initialValue: user.role_id
                    })(<Select style={{ width: 200 }} placeholder='请输入角色'></Select>)}
                </Item>{
                    roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
            </Form>
        )
    }
}
export default UserForm = Form.create()(UserForm)