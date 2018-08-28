import React from 'react';
import WrappedStepForm from "./WrappedStepForm.js";
import { Button } from "antd";
import { connect } from "dva";
class Step0 extends React.Component {

    constructor(props) {
        super(props);
        // 局部的state
        this.state = {
            form0:{
                km:{},
                price1:{},
                price2:{},
                seat:{},
                fuel:{},
                gearbox:{},
                exhaust:{},
                buydate:{},
                brandandseries:{}
            }
        }
    }
    // 当任何的组件圆度被更改的时候
    handleFormChange(changeFields){
        this.setState({
           form0:{
            ...this.state.form0,
            ...changeFields
           }
        })
    }
    render() {
        // 检测下一步按钮是否可以点击
        const checkdisable = ()=>{

            for( var k in this.state.form0){
                if( this.state.form0[k].errors || this.state.form0[k].value === undefined){

                    return true;
                }
                return  false // false表示鞥被点击
            }

        }
        return (
            <div>

                <WrappedStepForm
                    {...this.state.form0}
                    onChange={this.handleFormChange.bind(this)}
                ></WrappedStepForm>
                <Button
                    type="primary"
                    disabled={checkdisable()}
                    onClick = {()=>{
                        this.props.dispatch({"type":"addCar/changeStep","step":1})
                        this.props.dispatch({"type":"addCar/changeForm0","form0":this.state.form0})
                    }}

                >下一步</Button>
            </div>
        );
    }
}
export default connect()(Step0)