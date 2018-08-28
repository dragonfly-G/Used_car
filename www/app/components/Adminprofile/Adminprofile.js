import React from 'react';
import {Row,Col} from 'antd';
import MyForm from "./MyForm.js";
import CutBox from "./CutBox.js";
import "./Adminprofile.less";
import App from "../../containers/App.js";
export default class Adminprofile extends React.Component {

    constructor() {
        super();
        this.state = {
            isShowXuanfu:false,
            //图片的真实的尺寸
            realW:0,
            realH:0,
            //图片的显示的尺寸
            imgW:0,
            imgH:0,
            boxW:0,
            boxH:0,
            padding:0,
            picurl:""

        }
        var self = this;
        // 定义一个函数，设置显示弹出层
        window.openXuanfu = function(){
            self.setState({isShowXuanfu:true})
        }
        window.closeXuanfu = function(){
            self.setState({isShowXuanfu:false});
            $(self.refs.xiaodianshi).attr("src","/pages/adminavatarform.html")
        }
        // 图片上传完毕之后的回调
        window.onUpDone = function(picurl,realW,realH){

            realW = parseInt(realW);
            realH = parseInt(realH);
            // 得到图片的宽高比
            var rate = realW / realH;
            // 定义一些常量
            const maxBoxWidth = 700;
            const minBoxWidth = 450;
            const maxBoxHeight = 500;
            const minBoxHeight = 350;
            const padding = 10;
            const rightPart = 180;
            // 计算图片要显示的宽度、高度
            var imgW = realW;
            var imgH = realH;
            // 盒子要显示的高度、宽度
            var boxW=null ,boxH=null;
            // 判断不符合标准的图片要被弹出层的最大值或最小值限制住。
            if( realW > maxBoxWidth - rightPart - 2*padding){
                imgW = maxBoxWidth - rightPart - 2*padding;
                // 让高度按比例变化
                imgH = imgW / rate;
            }
            if( imgH > maxBoxHeight - 2 * padding){

                imgH = maxBoxHeight - 2 * padding;
                // 让高度按比例变化
                imgW = imgH * rate;
            }
            // 决定显示盒子的尺寸
            boxW = imgW + 180 + 2 * padding;
            boxH = imgH + 2 * padding;
            // 验收最小值
            if( boxW < minBoxWidth){
                boxW = minBoxWidth;
            }
            if( boxH < minBoxHeight){
                boxH = minBoxHeight;
            }

            self.setState({
                realW,
                realH,
                imgW,
                imgH,
                boxW,
                boxH,
                padding,
                picurl
            })

        }
    }
    render() {

        return (
            <App k="admin">
                <div>
                    <Row>
                        <Col span={12}>
                            <MyForm></MyForm>
                        </Col>
                        <Col>

                            <iframe height={200} ref="xiaodianshi" src="/pages/adminavatarform.html" frameBorder="0"></iframe>
                        </Col>
                    </Row>
                    {
                        this.state.isShowXuanfu
                        ?
                        <div className="xuanfuceng">
                            <CutBox
                                realW={this.state.realW}
                                realH={this.state.realH}
                                imgW={this.state.imgW}
                                imgH={this.state.imgH}
                                boxW={this.state.boxW}
                                boxH={this.state.boxH}
                                padding={this.state.padding}
                                picurl={this.state.picurl}
                            ></CutBox>
                        </div>
                        :
                        null
                    }
                </div>
            </App>
        );
    }
}
