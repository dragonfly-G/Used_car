import React from 'react';
import { connect } from "dva";
import { Input , Table} from "antd";
import User from "../../../containers/User.js";
class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({"type":"userlist/init"});
    }

    render() {
        const columns = [
            {
                title:"编号",
                dataIndex:"id",
                key:"id",
                sorter:true
            },
            {
                title:"姓名",
                dataIndex:"name",
                key:"name",
                sorter:true
            },
            {
                title:"手机号",
                dataIndex:"mobile",
                key:"mobile"
            },
            {
                title:"性别",
                dataIndex:"sex",
                key:"sex"
            },
            {
                title:"城市",
                dataIndex:"city",
                key:"city",
                sorter:true
            },
            {
                title:"身份证",
                dataIndex:"idCard",
                key:"idCard"
            },
            {
                title:"邮箱",
                dataIndex:"email",
                key:"email"
            }
        ]
        return (
            <User k="adduser" c="添加用户">
                <div>
                    <h1>用户信息</h1>
                    <Input onChange={(e)=>{

                        this.props.dispatch({"type":"userlist/changeKeyword","keyword":e.target.value})
                    }}></Input>
                    <b>共5000条</b>
                    <Table
                        rowKey="id"
                        dataSource={this.props.users}
                        columns={columns}
                        pagination = {{
                            current:this.props.pagination.page,
                            pageSize:this.props.pagination.pagesize,
                            total:this.props.pagination.total,
                            showSizeChanger:true,
                            pageSizeOptions:["5","10","20","50","100"]
                        }}
                        onChange = {(pagination,filters, sorter)=>{
                            this.props.dispatch({
                                "type":"userlist/changePage",
                                "page":pagination.current,
                                "pagesize":pagination.pageSize
                            })
                            console.log(sorter);
                            this.props.dispatch({
                                "type":"userlist/changeSort",
                                "sortby":sorter.field || "id",
                                "sortdirection":sorter.order || "ascend"
                            })
                        }}
                    >
                    </Table>
                </div>
            </User>
        );
    }
}
export default connect(
    ({userlist})=>({
        users:userlist.users,
        pagination:userlist.pagination
    })
)(UserList);