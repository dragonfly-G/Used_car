import React from 'react';
// import CarList from "../components/CarList/CarList.js";
// import  Adminprofile from "../components/Adminprofile/Adminprofile.js"
// import UserList from "../components/UserList/UserList.js";
// import AddCar from "../components/AddCar/AddCar.js";
import { connect } from "dva";

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import {push} from 'react-router-redux'
class App extends React.Component {

    constructor(props) {
        super(props);
        // App组件负责发出一个init，让图片能够有一个初始的ID，开始一系类的反应
        // props.dispatch({"type":"picshow/init","nowid":1000088})
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                      <div className="logo" />
                      <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.k]}
                        style={{ lineHeight: '64px' }}
                        onClick={(e)=>{
                          this.props.dispatch(push(e.item.props.root))
                        }}
                      >
                        <Menu.Item key="index" root="/">首页</Menu.Item>
                        <Menu.Item key="buy" root="/buy/carlist">买车</Menu.Item>
                        <Menu.Item key="sale" root="/sale/addcar">卖车</Menu.Item>
                        <Menu.Item key="user" root="/user/userlist">用户</Menu.Item>
                        <Menu.Item key="admin" root="/admin" >管理员</Menu.Item>
                      </Menu>
                    </Header>
                  </Layout>
                  {
                    this.props.children
                  }
            </div>
        );
    }
};
export default connect()(App);