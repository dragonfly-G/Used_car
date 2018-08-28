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
        return   <App k="buy">
            <Layout>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={[this.props.k]}
                      style={{ height: '100%', borderRight: 0 }}
                      onClick={(item)=>{
                        console.log(item.key);
                        this.props.dispatch(push("/buy/"+item.key))
                      }}
                    >
                        <Menu.Item key="carlist">大表选车</Menu.Item>
                        <Menu.Item key="zhuanjia">专家荐车</Menu.Item>
                        <Menu.Item key="yunqi">运气选车</Menu.Item>
                        <Menu.Item key="sifa">司法拍卖</Menu.Item>
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