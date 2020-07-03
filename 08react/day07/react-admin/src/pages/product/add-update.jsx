import React, { Component } from 'react'
import { Form, Input, Card, Icon, Cascader, Button, message } from 'antd'
import { reqCategorys,reqAddOrUpdateProduct } from '../../api/index';

import RichTextEditor from './rich-text-editor'
import PicturesWall from './pictures-wall'
import LinkButton from '../../components/link-button'


const { TextArea } = Input;
const { Item } = Form
//label 中的数据给用户看的，value提交给服务器
class productAddUpdate extends Component {

    // 自动校验 校验输入商品的价格
    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback()
        } else {
            callback('价格必须大于0')
        }
    }
    // loading效果，默认为false
    state = {
        loading: false,
        options: []
    };
    constructor(props){
        super(props)
        // ref 创建 pw --picturesWall
       this.pw= React.createRef()
         // 创建ref，拿到实例
        this.editor= React.createRef()
    }
    // 二级联动 onchange选中 点击一级
    onChange = (value, selectedOptions) => {
        // console.log(value, selectedOptions);
    };
    //初始化options
    initOptinos = async (categorys) => {
        const options = categorys.map(c => ({//map之后拿到options
            value: c._id,
            label: c.name,
            isLeaf: false
        }))
        // 如果是一个二级分类商品
        let { isUpdate, product } = this;
        let { pCategoryId, categoryId } = product;
        if (isUpdate && pCategoryId !=='0') {
          const subCategorys=  await this.getCategorys(pCategoryId);
          let childOptions = subCategorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: true
        }))
        const targetOption=options.find(option=>option.value===pCategoryId)
        targetOption.children = childOptions;
        }

        // console.log(options)
        //转变完之后更新状态
        this.setState({
            options,
        })
    }
    // 点击一级走到loadData
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;//开启loading效果
        // console.log(targetOption.value)//一级分类的_id 根据一级分类_id获取二级分类，方法getCategorys
        const subCategorys = await this.getCategorys(targetOption.value)//二级分类
        //   console.log(subCategorys)//返回一个promise
        targetOption.loading = false;//关闭loading效果
        //拿到二级分类数据，有的有有的没有 所以进行判断
        if (subCategorys && subCategorys.length > 0) {
            //当前的一级分类有二级数据,让二级分类列表进行转换成 value label isLeaf的形式
            let childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            // console.log(childOptions)
            // 得到数据之后 给targetOption加上Children
            targetOption.children = childOptions
        } else {
            //当前的一级分类没有二级数据
            targetOption.isLeaf = true

        }
        this.setState({
            options: [...this.state.options],
        });
    };
    // 获取一级或二级分类列表
    getCategorys = async (parentId) => {
       const result = await reqCategorys(parentId)
        //    console.log(result.data)
        //拿到结果之后
        if (result.data.status === 0) {//表示获取分类数据成功
            const categorys = result.data.data//数据可能是一级分类也可能是二级分类，需要判断
            if (parentId === '0') {
                this.initOptinos(categorys)
            } else {//二级分类 promise成功的结果
                return categorys;
            }
            // console.log(categorys)//添加商品就调用商品
            //获取数据之后要初始化options,写一个方法进行初始化
            this.initOptinos(categorys);
        }
    }

    //增加或修改提交
    submit=()=>{
        this.props.form.validateFields( async (error,values)=>{
            if(!error){
                //验证通过
                // console.log(values)
                // let imgs=this.pw.current.getImgs()
                // let detail= this.editor.current.getDetail()
                // console.log(imgs)
                // console.log(detail)
                // 准备数据
                const {name,desc,price,categoryIds}=values;
                // console.log(name,desc,price,categoryIds)
                let pCategoryId,categoryId;
                if(categoryIds.length===1){
                    // 一级分类
                    pCategoryId="0"
                    categoryId=categoryIds[0];
                }else{
                    // 二级分类
                    pCategoryId=categoryIds[0];
                    categoryId=categoryIds[1];
                }
               let imgs=this.pw.current.getImgs()
               let detail= this.editor.current.getDetail()
            //    console.log(imgs)
               const product={name,desc,price,imgs,detail,pCategoryId,categoryId}
               if(this.isUpdate){
                   product._id=this.product._id
               }
            //    调接口
               const result= await reqAddOrUpdateProduct(product)
            //  提示
            if(result.data.status===0){
                message.success(`${this.isUpdate?'更新':'添加'}商品成功`)
                this.props.history.goBack()
            }else{
                message.error(`${this.isUpdate?'更新':'添加'}商品失败`)
            }
            }
        })
    }
    componentWillMount() {
        let product
        if (this.props.location.state) {
            product = this.props.location.state.product
        }
        //   console.log(product)
        //如何知道是添加还是修改 如果传递了product isUpdate是true
        this.isUpdate = !!product;
        this.product = product || {};
    }
    componentDidMount() {
        this.getCategorys('0')
    }

    render() {
        let { isUpdate, product } = this;
        let { pCategoryId,categoryId ,imgs,detail} = product;
        // console.log(product)
        let categoryIds = [];
        if (isUpdate) {
            //修改
            if (pCategoryId === "0") {
                //一级
                categoryIds.push(categoryId)

            } else {
                //此商品是二级分类下的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)

            }
        }
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        const title = (<span>  <LinkButton><Icon onClick={() => { this.props.history.goBack() }} type="arrow-left" style={{ color: '#1DA57A', marginRight: '10px' }} /></LinkButton><span>{isUpdate ? '修改商品' : '添加商品'}</span></span>)
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [{ required: true, message: '请输入商品名称！' }]
                        })(<Input placeholder='请输入商品名称' />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [{ required: true, message: '请描述商品！' }]
                        })(<TextArea placeholder="请输入商品描述" autosize={{ minRows: 3, maxRows: 6 }} />)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [{ required: true, message: '请输入商品价格！' },
                            { validator: this.validatorPrice }
                            ],
                        })(
                            <Input type='number' placeholder='请输入商品价格' addonAfter={<span>元</span>} />
                        )}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryIds', {
                            initialValue: categoryIds,
                            rules: [{ required: true, message: '请指定商品分类' }],
                        })(
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                onChange={this.onChange}
                                changeOnSelect
                            />
                        )}
                    </Item>
                    <Item label='商品图片'>
                       <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>
                    </Item>
                    <Item label="商品详情" labelCol={{span:4}} wrapperCol={{span:20}} >

                           <RichTextEditor ref={this.editor} detail={detail}></RichTextEditor>

                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>

        )
    }
}
export default Form.create()(productAddUpdate);