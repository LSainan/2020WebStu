import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'
import memorySave from '../../utils/memorySave'
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

    state = {
        collapsed: false,
    };
    // 控制左侧导航收缩
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    //根据配置文件自动写入左侧导航到页面
    getMenuNodes = (menuList) => {
        //    得到当前请求的路径
        const path = this.props.location.pathname
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
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                // 如果存在, 说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }
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
    // 判断当前登录用户多item是否有权限
    hasAuth = item => {
        const { key, isPublick } = item;//取出key,菜单是否是公共的（无需权限也可见）
        const menus = memorySave.user.role.menus;//得到对应角色拥有的菜单
        const username = memorySave.user.username;//得到当前登录用户名
        /*
   1. 如果当前用户是admin
   2. 如果当前item是公开的
   3. 当前用户有此item的权限: key有没有存在于menus中
       */
        if (username === 'admin' || isPublick || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) {// 4. 如果当前用户有此item的某个子item的权限
            //!强制转换成bool类型值
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        return false
    }
    //1,getMenuItem用reduce函数重写方便对每一条进行控制
    getMenuItem = (menuList) => {
        const path = this.props.location.pathname //得到当前请求路径
        return menuList.reduce((pre, item) => {

            // 2,如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (this.hasAuth(item)) {
                if (!item.children) {//1.没有子菜单添加：
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {//2.有子菜单

                    // 查找一个与当前请求路径，是否匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // 如果存在, 说明当前item的子列表需要展开
                    if (cItem) {
                        this.openKey = item.key
                    }

                    // 向pre添加<SubMenu>
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.getMenuItem(item.children)}
                        </SubMenu>
                    ))
                }
            }
            return pre
        }, [])
    }
    componentWillMount() {
        this.menuNodes = this.getMenuItem(menuList)
    }
    render() {
        // 得到请请求的路由路径
        let path = this.props.location.pathname
        // 得到需要打开菜单项的key
        const openKey = this.openKey
        return (
            <div style={{ width: 200 }}>
                <h1 style={{ color: '#fff', fontSize: '24px', margin: 0 }}>商品管理后台</h1>
                <Menu
                    selectedKeys={[path]}
                    // defaultOpenKeys={['sub1']}
                    defaultOpenKeys={['openKey']}
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
/*用withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)