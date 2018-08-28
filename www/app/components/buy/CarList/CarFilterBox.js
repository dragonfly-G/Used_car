import React from 'react';
import { connect } from "dva";
import { Row ,Col } from "antd";
import moment from 'moment';
import MyTab from "./form_compos/MyTab.js";
import Series from "./form_compos/Series.js";
import MyCheckBox from "./form_compos/MyCheckBox.js"
import MyRange from "./form_compos/MyRange.js";
import MyCanlendar from "./form_compos/MyCanlendar.js";
import MyDropDown from "./form_compos/MyDropDown.js";
import MyTag from "./form_compos/MyTag.js";


class CarFilterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "km":[0,100],
            "price":[0,100],
            "char":""
        }
    }

    render() {

        var data = {
            "type":[],
            "seat":[],
            "brand":"",
            "series":"",
            "color":[],
            "engine":[],
            "buydate":[],
            "license":"",
            "exhaust":[],
            "gearbox":"",
            "fuel":""
        }
        this.props.nowfilters.forEach(item=>{
            data[item.k] = item.v
        })
        console.log(data);
        return (
            <div className="carFilterBox">
                <Row>
                    <Col span={2}>品牌：</Col>
                    <Col span={22}>
                        <MyTab
                            brand={data.brand}
                            onChoose={(v,char)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"brand",v})
                                this.setState({char})
                            }}
                        ></MyTab>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>车系：</Col>
                    <Col span={22}>
                        <Series
                            brand = {data.brand}
                            series={data.series}
                            char = {this.state.char}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"series",v})
                            }}
                        >
                        </Series>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>颜色：</Col>
                    <Col span={22}>
                        <MyCheckBox
                            v={data.color}
                            options={["白","红","黑","蓝","绿","香槟","黄","咖啡","灰","银灰","粉","橘"]}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"color",v})
                                if( v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFilter","k":"color"})
                                }
                            }}
                        >
                        </MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>车型：</Col>
                    <Col span={22}>
                        <MyCheckBox
                            v={data.type}
                            options={["A级轿车","B级轿车","C级轿车","大型SUV","中型SUV","小型SUV","面包车","跑车"]}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"type",v})
                                if( v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFilter","k":"type"})
                                }
                            }}
                        >
                        </MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>座位数：</Col>
                    <Col span={22}>
                        <MyCheckBox
                            v={data.seat}
                            options={["2","4","5","7","7座以上"]}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"seat",v})
                                if( v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFilter","k":"seat"})
                                }
                            }}
                        >
                        </MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>发动机：</Col>
                    <Col span={22}>
                        <MyCheckBox
                            v={data.engine}
                            options={["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","3.0","4.0","5.0"]}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"engine",v})
                                if( v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFilter","k":"engine"})
                                }
                            }}
                        >
                        </MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>排量：</Col>
                    <Col span={22}>
                        <MyCheckBox
                            v={data.exhaust}
                            options={["国一","国二","国三","国四","国五","国六"]}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"exhaust",v})
                                if( v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFilter","k":"exhaust"})
                                }
                            }}
                        >
                        </MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>价格（万元）</Col>
                    <Col span={16}>
                       <MyRange
                            onChoose={(v)=>{
                                 this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"price",v})
                            }}
                            onChange = {(v)=>{
                                this.setState({"price":v})
                            }}
                            v={this.state.price}
                            defaultV = {[0,100]}
                       ></MyRange>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>公里（万）</Col>
                    <Col span={16}>
                       <MyRange
                            onChoose={(v)=>{
                                 this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"km",v})
                            }}
                            onChange = {(v)=>{
                                this.setState({"km":v})
                            }}
                            v={this.state.km}
                            defaultV = {[0,100]}
                       ></MyRange>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>购买日期</Col>
                    <Col span={12}>
                       <MyCanlendar
                            onChoose={(v)=>{
                                this.props.dispatch({
                                    "type":"carlist/addOrChangeFilter",
                                    "k":"buydate",
                                    "v":[v[0].format("x"),v[1].format("x")]
                                })
                            }}
                            buydate = {
                                data.buydate[0]
                                ?
                                [moment(Number(data.buydate[0])),moment(Number(data.buydate[1]))]
                                :
                                []
                            }
                       >
                       </MyCanlendar>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>杂项</Col>
                    <Col span={22}>
                      <MyDropDown
                        title="燃料"
                        options={["汽油","柴油","油电混合","纯电动"]}
                        v={data.fuel}
                        onChoose={(v)=>{
                            this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"fuel",v})
                        }}
                      ></MyDropDown>
                      <MyDropDown
                        title="变速箱"
                        options={["自动","手动"]}
                        v={data.gearbox}
                        onChoose={(v)=>{
                            this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"gearbox",v})
                        }}
                      ></MyDropDown>
                      <MyDropDown
                        title="是否上牌"
                        options={["是","否"]}
                        v={data.license}
                        onChoose={(v)=>{
                            this.props.dispatch({"type":"carlist/addOrChangeFilter","k":"license",v})
                        }}
                      ></MyDropDown>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>当前</Col>
                    <Col span={22}>
                        <MyTag
                            nowfilters = {this.props.nowfilters}
                            onClose={(k)=>{
                                this.props.dispatch({"type":"carlist/removeFilter",k})
                                // 若你删除了price此时要恢复0~100
                                if(k == "price"){
                                    this.setState({"price":[0,100]})
                                }else if( k == "km"){
                                    this.setState({"km":[0,100]})
                                }
                            }}
                        >
                        </MyTag>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        nowfilters:carlist.nowfilters
    })
)(CarFilterBox);