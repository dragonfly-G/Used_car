import React from 'react';

import CarFilterBox from "./CarFilterBox.js";
import CarTableBox from "./CarTableBox.js";
import  PicShow from "../PicShow/PicShow.js";
import { connect } from "dva";
import "./carList.less";

import Buy from "../../../containers/Buy.js";
class CarList extends React.Component {

    constructor(props) {
        super(props);
        // 发送一个默认的请求。
        props.dispatch({"type":"carlist/init"});

        this.state = {
            isShowXuanfu : false ,//是否显示悬浮框
            xuanfuId:0 // 悬浮层‘显示汽车而定ID
        }
    }
    // 设置悬浮层的ID
    setXuanfu(xuanfuId,isShowXuanfu){
        this.setState({xuanfuId,isShowXuanfu});
    }
    render() {
        return (
            <Buy k="carlist" c="大表选车">
                <div>
                    <CarFilterBox></CarFilterBox>
                    <CarTableBox
                        setXuanfu = { this.setXuanfu.bind(this)}
                    ></CarTableBox>
                   {
                    this.state.isShowXuanfu
                    ?
                    <div className="xuanfu">
                        <div className="inner">
                            <div className="closeBtn"
                                onClick = {()=>{
                                    this.setState({"isShowXuanfu":false});
                                    this.props.dispatch({"type":"picshow/clearImages"});
                                }}
                            >X</div>
                            <PicShow id={this.state.xuanfuId}></PicShow>
                        </div>
                    </div>
                     :
                     null
                   }
                </div>
            </Buy>
        );
    }
}
export default connect()(CarList);