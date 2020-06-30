import React, { Component } from "react"
import { Card, Table, Button, message, Modal,Icon } from 'antd'
// import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from "./add-form"
import UpdateForm from "./update-form"

export default class Category extends Component {
    state = {
        columns: [], // 表头数据
        categorys: [], // 一级分类数据
        subCategorys: [], // 二级分类数据
        loading: false, // 获取分类数据时的loading
        parentId: "0", // 当现分类列表的一级分类的ID
        parentName: "", // 一级分类的名字
        showStuatus:0, // 控制添加/修改确认框是否显示  0 都不显示   1 添加添加   2 显示修改
    }
    // 初始化表头
    initColumns = () => {
        const columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton style={{ marginRight: '10px' }} onClick={() => { this.showUpdate(category) } }>修改分类</LinkButton>
                        {this.state.parentId === "0" ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ];
        this.setState({ columns })
    }
    // ajax获取一级分类数据或二级分类数据
    getCategorys = async (parentId) => {
        // 在发送ajax之前，显示loading
        this.setState({ loading: true })
        parentId = parentId || this.state.parentId;
        const result = await reqCategorys(parentId);
        this.setState({ loading: false })
        // console.log(result)
        if (result.data.status === 0) {
            const categorys = result.data.data; // 得到的可能是一级分类数据，也可能是二级分类的数据
            if (parentId === '0') {
                this.setState({ categorys: categorys }); // 更新一级分类状态
            } else {
                // 更新二级分类
                this.setState({ subCategorys: categorys }); // 更新一级分类状态
            }

        } else {
            message.error("获取分类列表失败~")
        }
    }
    // 点击一级分类导航时，显示一级分类
    showCategorys = () => {
        this.setState({
            parentId: "0",
            parentName: "",
            subCategorys: [],
        })
    }
    // 显示二级分类列表
    showSubCategorys = (category) => {
        // // console.log(category)
        // this.setState({      // setState是同步的还是异步的
        //     parentId:category._id,
        //     parentName:category.name
        // })
        // console.log("----->"+this.state.parentId); // 0表示setState是异步的
        // // 只有先执行了setState之后，再去调用getCategorys获取的数据才是二级分类数据
        // this.getCategorys(); // 获取二级分类数据

        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            // 状态改变后，执行此回调函数
            // console.log("123" + this.state.parentId);
            this.getCategorys();
        })
    }
    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {  // ajax
        this.getCategorys(); // 获取一级分类数据
    }
    // 点击更新分类按钮
    showUpdate = (category)=>{
        this.category = category; // 保存分类对象
        // alert("更新分类")
        this.setState({
            showStuatus:2
        })
    }
    // 点击添加分类按钮
    showAdd = ()=>{
        this.setState({
            showStuatus:1
        })
    }

    // 添加Model中OK按钮
    addCategory = async ()=>{
        // alert("添加分类")
        // 1)隐藏确认框
        this.setState({
            showStuatus:0
        })

        // 2)获取数据
        const {parentId,categoryName} = this.form.getFieldsValue();
        this.form.resetFields(); // 清除表单之前的数据

        // 3)调用接口完成添加
        const result =  await reqAddCategory(parentId,categoryName)
        // console.log(result)
        if(result.data.status === 0){
            const categorys = result.data.data;
            // console.log(categorys)
            if(parentId === this.state.parentId){
                // 添加的分类就是当前列表下的分类
                // 重新获取分类列表数据
                this.getCategorys();
            }else if(parentId === "0"){
                // 在二级分类列表下面添加一级分类，重新获取一级分类列表
                this.getCategorys('0');
            }

        }
    }
    // 更新Model中OK按钮
    updateCategory = async ()=>{
        // alert("更新分类")
        // 1、隐藏确定框
        this.setState({
            showStuatus:0
        })
        // 2、准备好数据
        let categoryId = this.category._id;
        let categoryName = this.form.getFieldValue('categoryName');
        this.form.resetFields(); // 清除表单之前的数据

        // 3、调用更新接口 传递参数
        let result = await reqUpdateCategory({categoryId, categoryName})
        if(result.data.status === 0){
            this.getCategorys();
        }
    }
    // 添加或更新框中的取消
    handleCancel = ()=>{
        this.form.resetFields(); // 清除表单之前的数据
        this.setState({
            showStuatus:0
        })
    }
    render() {
        let { categorys, parentId, subCategorys, loading, columns, parentName, showStuatus } = this.state;
        let category = this.category || {}; // 读取分类对象
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
               <Icon type="plus" /> 添加
            </Button>
        )
        let title = parentId === "0" ? "一级分类列表" : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <span> <Icon type="arrow-right" /> </span>
                <span>{parentName}</span>
            </span>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    loading={loading}
                    rowKey="_id"
                    dataSource={parentId === "0" ? categorys : subCategorys}
                    columns={columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />

                <Modal
                    visible={showStuatus == 1}
                    title="添加分类"
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categorys={categorys} parentId={parentId} setForm={(form)=>{this.form=form}}></AddForm>
                </Modal>
                <Modal
                    visible={showStuatus===2}
                    title="更新分类"
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                <UpdateForm categoryName = {category.name} setForm={(form)=>{this.form=form}}></UpdateForm>
                </Modal>
            </Card>
        )
    }
}
