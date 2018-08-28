import React from "react";
import {connect} from "dva";
import {push} from 'react-router-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import App from "./App.js";
class Buy extends React.Component {
    constructor(){
        super();
    }
    render(){
        return   <App k="user">
            <Layout>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={[this.props.k]}
                      style={{ height: '100%', borderRight: 0 }}
                      onClick={(item)=>{
                        console.log(item.key);
                        this.props.dispatch(push("/user/"+item.key))
                      }}
                    >
                        <Menu.Item key="userlist">用户大表</Menu.Item>
                        <Menu.Item key="addlist">添加用户</Menu.Item>
                    </Menu>
                  </Sider>
                  <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>首页</Breadcrumb.Item>
                      <Breadcrumb.Item>买车</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        {this.props.c}
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                  </Layout>
                </Layout>

        </App>
    }
}
export default connect()(Buy);