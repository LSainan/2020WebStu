import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form,Input } from 'antd'
const Item = Form.Item
export default class CategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired
  }
  render() {
    return (
      <Form>
        <Item>
          <Input placeholder='请输入分类名称'/>
        </Item>
      </Form>
    )
  }
}
