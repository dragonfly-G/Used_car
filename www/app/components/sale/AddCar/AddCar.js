import React from 'react';
import {connect} from "dva";
import { Steps, Button, message ,Divider  } from 'antd';
import "./AddCar.less";
const Step = Steps.Step;

import Sale from "../../../containers/Sale.js";
import Step0 from "./Step0.js";
import Step1 from "./Step1.js";
import Step2 from "./Step2.js";

class AddCar extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const showStep = (n)=>{
            var arr = [
                <Step0></Step0>,
                <Step1></Step1>,
                <Step2></Step2>
            ];
            return arr[n];
        }
        return (
            <Sale k="addcar" c="信息添加">
                <div>
                    <h1>增加车辆</h1>
                    <Divider></Divider>
                    <Steps current={this.props.step}>
                       <Step title="车辆的基本信息" description="车型、车主、公里数等"></Step>
                       <Step title="车辆的图片" description="外观、内饰、结构及发动机、更多细节图"></Step>
                       <Step title="车辆的其它的文件" description="行驶证、汽车的大照片等"></Step>
                    </Steps>
                    <div className="steps-content">{showStep(this.props.step)}</div>
                </div>
            </Sale>
        );
    }
}
export default connect(
    ({addCar})=>({
        step:addCar.step
    })
)(AddCar);