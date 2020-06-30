import React, { Component } from 'react'
import { Card, Icon } from "antd"
export default class productDetail extends Component {
    render() {
        const gridStyle = {
            width: '100%',

        };
        let title = (<span> <Icon type="arrow-left" style={{ color: '#1DA57A', marginRight: '10px' }} />商品详情 </span>)
        return (
            <Card title={title}>
                <Card.Grid style={gridStyle}>商品名称：</Card.Grid>
                <Card.Grid style={gridStyle}>商品描述：</Card.Grid>
                <Card.Grid style={gridStyle}>商品价格：</Card.Grid>
                <Card.Grid style={gridStyle}>所属分类：</Card.Grid>
                <Card.Grid style={gridStyle}>商品图片：</Card.Grid>
                <Card.Grid style={gridStyle}>商品详情：</Card.Grid>
            </Card>
        )
    }
}