import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu,Icon } from 'antd';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
// import {
//     AppstoreOutlined,
//     HomeOutlined,
//     UserOutlined,
//     PieChartOutlined,
//     AreaChartOutlined,
//     ContainerOutlined
// } from '@ant-design/icons';

class LeftNav extends Component {

    state={
        collapsed:false,
    };
    // 控制左侧导航收缩
    toggleCollapsed=()=>{
        this.setState({
            collapsed: !this.state.collapsed,
          });
    }
    //
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                        <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 有children
                return (
                    <SubMenu key={item.key} title={
                        <span> <Icon type={item.icon}></Icon>{item.title}</span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        // 得到请请求的pathname
        let path = this.props.location.pathname
        return (
            <div style={{ width: 200 }}>
                <h1 style={{ color: '#fff', fontSize: '24px', margin: 0 }}>商品管理后台</h1>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark">
                    {/* <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to='/home'>
                        首页
                        </Link>
</Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="2" icon={<AppstoreOutlined />}> <Link to='/category'>商品管理</Link></Menu.Item>
                        <Menu.Item key="3" icon={<AppstoreOutlined />}><Link to='/category'>品牌管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                    <Link to='/user'> 用户管理</Link>

</Menu.Item>
                    <Menu.Item key="6" icon={<ContainerOutlined />}>
                    <Link to='/role'> 角色管理</Link>

</Menu.Item>

                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="7" icon={<PieChartOutlined />}><Link to='/bar'> 柱形图</Link></Menu.Item>
                        <Menu.Item key="8" icon={<PieChartOutlined />}><Link to='/line'>折线图</Link></Menu.Item>
                        <Menu.Item key="9" icon={<PieChartOutlined />}><Link to='/pie'> 饼图</Link></Menu.Item>
                    </SubMenu> */}
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)