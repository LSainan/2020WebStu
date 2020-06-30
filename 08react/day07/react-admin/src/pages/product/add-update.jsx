import React, { Component } from 'react'
import { Form, Select, Input, Card, Icon, Upload, message } from 'antd'

const { Option } = Select;
const { TextArea } = Input;


// 图片上传
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class productAddUpdate extends Component {
    state = {
        loading: false,
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        };


        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        let title = (<span> <Icon type="arrow-left" style={{ color: '#1DA57A', marginRight: '10px' }} />添加商品 </span>)
        return (
            <Card title={title}>
                <Form style={{ marginTop: '10px' }}>
                    <Form.Item {...formItemLayout} label="商品名称">
                        {getFieldDecorator('productName', {
                            rules: [{ required: true, message: '请输入商品名称！' }]
                        })(<Input placeholder='请输入商品名称' />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品描述">
                        {getFieldDecorator('desc', {
                            rules: [{ required: true, message: '请描述商品！' }]
                        })(<TextArea placeholder="请输入商品描述" rows={4} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品价格">
                        {getFieldDecorator('price', {
                            rules: [{ required: true }],
                        })(
                            <Input placeholder='请输入商品价格' suffix='元' />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品分类">
                        {getFieldDecorator('categorys', {
                            rules: [{ required: true, message: '请指定商品分类' }],
                        })(
                            <Select
                                placeholder="请指定商品分类"
                            >
                                <Option value="0">手机</Option>
                                <Option value="1">冰箱</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品图片">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    </Form.Item>
                </Form>
            </Card>

        )
    }
}
export default Form.create()(productAddUpdate)