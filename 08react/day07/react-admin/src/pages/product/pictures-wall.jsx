import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import PropTypes from 'prop-types'
import {reqDeleteImg} from '../../api/index'
import { BASE_IMG_URL} from '../../utils/constants'


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  // 校验
  static propTypes={
    imgs:PropTypes.array
  }
  state = {
    previewVisible: false,//显示或取消弹框Model
    previewImage: '',//显示的大图片
    fileList: [
      // {
      //   uid: '-1',//唯一标识
      //   name: 'image.png',//文件名
      //   status: 'done',//状态有：uploading done error removed
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
  };
  constructor(props){
    super(props);
    let fileList=[];
    const {imgs}=this.props;
    if(imgs && imgs.length>0){
      fileList=imgs.map((img,index)=>({
        uid:-index,
        name:img,
        status:'done',
        url:BASE_IMG_URL+'/'+img
      }))
      // console.log(imgs)
    }
    this.state = {
      previewImage:false,
      previewImage:"",
      fileList
  }
  }
  //点击X隐藏弹框
  handleCancel = () => this.setState({ previewVisible: false });
  // 点击了预览
  handlePreview = async file => {//file为图片
    // 如果地址为true 并且图片 undefined取反为true
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // 改变状态
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,//显示弹框
    });
  };
  // onchange 上传中 或完成 或失败都会调用这个函数 上传后改变状态
  handleChange = async ({ file, fileList }) => {
    // console.log(file)//当前操作的图片
    // console.log(fileList)//所有已上传图片对象的数组
    // console.log(file.status)
    // console.log(fileList.length)
    //如果上传成功 组件upload内部发出请求，然后拿到响应
    if (file.status === 'done') {
      const result = file.response;
      //  console.log(result)
      if (result.status === 0) {
        message.success('上传图片成功')
        // 成功之后 我们拿到name url
        let { name, url } = result.data;
        file = fileList[fileList.length - 1]//拿到图形对象数组中最后一个图片对象
        file.name = name;
        file.url = url
      }
      else {
        message.error('上传图片失败')
      }
    }
    else if (file.status === 'removed') {
      //直接点击了垃圾桶 删除的是fileList中的数据
      //真实要删除的是后端的数据
      // console.log('removed')
      //删除请求接口
      let result = await reqDeleteImg(file.name)
            if(result.data.status === 0){
                message.success("删除图片成功")
            }else{
                message.error("删除图片失败")
            }
    }
    // 在上传中或完成时更新fileList的状态
    this.setState({ fileList });
  }
  // 获取所有已上传图片
  getImgs = () => {
    //map 返回一个数组，放了很多图片的名字
    return this.state.fileList.map(file => file.name)
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>

      </div>
    );
    return (
      <div>
        {/* action 调用接口地址 upload内部调用 */}
        <Upload
          action="/manage/img/upload"//上传图片接口地址
          accept='image/*' // 只接受图片类型的
          listType="picture-card"
          name='image'//请求参数名
          fileList={fileList}//所有已上传的图形文件对象数组
          onPreview={this.handlePreview}//显示file对应的文件大图
          onChange={this.handleChange}//上传中、完成调用
        >
          {/* uploadButton 图片中的加号按钮 */}
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}