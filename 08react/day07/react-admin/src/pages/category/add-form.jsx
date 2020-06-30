import React,{Component} from "react"
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd';

const { Option } = Select;

class AddForm extends Component{
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired,
        parentId: PropTypes.string.isRequired,
    }
    // 即将挂载
    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { categorys,parentId } = this.props;
        return(
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue: parentId,
                        })(
                            <Select>
                                <Option value="0" >一级分类</Option>
                                { categorys.map(c=><Option  Key={c._id} value={c._id}>{c.name}</Option>)}
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: "",
                        })(
                            <Input placeholder="请输入分类名称"></Input>
                        )
                    }

                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)
// 高阶函数：一个函数的参数或返回值也是一个函数，此函数叫高阶函数。













