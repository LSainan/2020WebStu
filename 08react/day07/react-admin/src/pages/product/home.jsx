import React, { Component } from 'react'
import { Button, Table, Card, Icon, Select, Input } from 'antd'
import { reqProducts,reqSearchProducts } from '../../api/index'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import { withRouter } from 'react-router-dom'

const { Option } = Select;
 class productHome extends Component {
    state = {
        products: [],//商品
        total: 0,//商品总数量
        loading: false,//获取商品时的loading
        searchName:'',//搜索关键字
        searchType:'productName',//根据哪个字段进行搜索
    }
    // 初始化表头
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => "￥" + price
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => (
                    <span>
                        <LinkButton style={{ marginRight: '10px' }} onClick={()=>{this.productDetail()}}>详情</LinkButton>
                        <LinkButton >修改</LinkButton>
                    </span>
                )
            }
        ];
    }
    // 点击商品详情页面

    // 获取商品列表数据
    getProducts = async (pageNum) => {
        this.setState({loading:true})
        let {searchName,searchType}=this.state
        let result;
        //判断是默认显示还是搜索分页显示商品
        if(searchName){
           result= await reqSearchProducts(pageNum,PAGE_SIZE,searchName,searchType)
        }else{
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        // result = await reqProducts(pageNum, PAGE_SIZE)
        this.setState({loading:false})
        // console.log(result)
        if (result.data.status === 0) {
            const { total, list } = result.data.data;
            this.setState({
                total,
                products: list
            })
        }
    }
    // 发送ajax
    componentDidMount() {
        this.getProducts(1)
    }
    // 商品详情
    productDetail=()=>{
        return this.props.history.push('/product/detail')
    }
    //添加更新商品
    addUpdateProduct=()=>{
        return this.props.history.push('/product/addUpdate')
    }
    // 即将挂载
    componentWillMount() {
        this.initColumns();
    }
    render() {
        let { loading, products,total,searchType,searchName} = this.state
        const title = (
            <span>
                <Select
                    showSearch
                    value={searchType}
                    style={{ width: 130 }}
                    onChange={value=>this.setState({searchType:value})}
                >
                    <Option  value="productName">按名称搜索
                    </Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                 style={{ width: 100, margin: '0 10px' }}
                 placeholder="关键字"
                 value={searchName}
                 onChange={event=>this.setState({searchName:event.target.value})}
                 />
                <Button type="primary"
                onClick={()=>{this.getProducts(1)}}
                >搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>{this.addUpdateProduct()}}>
                <Icon type="plus" /> 添加商品
            </Button>
        )
        return (
            <Card
                title={title}
                extra={extra}
            >
                <Table
                    bordered
                    dataSource={products}
                    rowKey='_id'
                    columns={this.columns}
                    loading={loading}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}
export default withRouter(productHome)