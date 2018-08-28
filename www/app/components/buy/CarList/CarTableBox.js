import React from 'react';
import {connect} from "dva";
import {Table} from "antd";
import columns from "./api/colmuns.js";
import fp from "lodash/fp";
import { Row , Col , Radio , Input , Button , Modal} from "antd";
import Biaohelieshezhi from "./Biaohelieshezhi.js";
import Grid from "./Grid.js";
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class CarTableBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // 默认列表形式
            showType:"table",
            isShowBiaohelieshezhi:false,
            cols:(function(){
                if(localStorage.getItem("ershouchecols")){
                    return JSON.parse(localStorage.getItem("ershouchecols"));
                }else{
                    return ["id","avatar","brand","price","km","type","engine"]
                }
            })()
        }
    }
    // 过滤cols函数
    getCols(cols){
        var ARR = [];
        for (var i = 0; i < cols.length; i++) {
            for (var j = 0; j < columns.length; j++) {
                if(cols[i] == columns[j].dataIndex){
                    ARR.push(columns[j])
                }
            };
        };
        return ARR;
    }
    // 组件上树之后
    componentDidMount() {
        var self = this;
        // 使用事件委托
        $(this.refs.carTableBox).on("click",".suoluetu",function(){
            var tempId = $(this).data("id");
            self.props.setXuanfu(tempId,true);
        })
    }
    render() {
        // 临时克隆state中的cols数组，这个才能保证state只读的
        var arr = fp.clone(this.state.cols);
        // 改变临时数组
        const setArr = (_arr)=>{
           arr = _arr;
        }
        return (
            <div className="carTableBox" ref="carTableBox">
                <Row>
                    <Col span={16}>
                        <div className="tip">
                            共 {this.props.pagination.total}量车符合要求，
                            当前{this.props.pagination.page}/{this.props.pagination.total / this.props.pagination.pagesize }页
                        </div>
                    </Col>
                    <Col span={8}>
                        <RadioGroup
                            className="radioGroup"
                            value={this.state.showType}
                            onChange = {(e)=>{
                                this.setState({showType:e.target.value})
                                if( e.target.value == "grid"){

                                        this.props.dispatch({"type":"carlist/changePage",page:this.props.pagination.page,pagesize:20})
                                }
                            }}
                        >
                           <RadioButton value="table">列表视图</RadioButton>
                           <RadioButton value="grid">网格视图</RadioButton>
                        </RadioGroup>
                        <Button
                            className="btn"
                            type="primary"
                            icon="setting"
                            shape="circle"
                            onClick={()=>{
                                this.setState({isShowBiaohelieshezhi:true})
                            }}
                        ></Button>
                    </Col>
                </Row>
                <Modal
                         title="表格列的设置"
                         visible={this.state.isShowBiaohelieshezhi}
                         onOk={()=>{
                            this.setState({
                                cols:arr,
                                isShowBiaohelieshezhi:false
                            })
                            //在本地存储一份数据，
                            localStorage.setItem("ershouchecols",JSON.stringify(arr))
                         }}
                         onCancel={()=>{
                            this.setState({isShowBiaohelieshezhi:false})
                         }}
                         destroyOnClose={true}
                       >
                        <Biaohelieshezhi setArr={setArr} arr = {arr}></Biaohelieshezhi>
                       </Modal>
                    {
                        this.state.showType == "grid"
                        ?
                        <Grid></Grid>
                        :
                        <Table
                            rowKey="id"
                            dataSource={this.props.cars}
                            columns={this.getCols(this.state.cols)}
                            pagination = {{
                                current:this.props.pagination.page,
                                pageSize:this.props.pagination.pagesize,
                                total:this.props.pagination.total,
                                showSizeChanger:true,
                                pageSizeOptions:["5","10","20","50"]
                            }}
                            onChange = {(pagination,filters, sorter)=>{
                                this.props.dispatch({
                                    "type":"carlist/changePage",
                                    "page":pagination.current,
                                    "pagesize":pagination.pageSize
                                })
                                console.log(sorter);
                                this.props.dispatch({
                                    "type":"carlist/changeSort",
                                    "sortby":sorter.field || "id",
                                    "sortdirection":sorter.order || "ascend"
                                })
                            }}
                        />
                    }
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        "cars":carlist.cars,
        "pagination":carlist.pagination
    })

)(CarTableBox);