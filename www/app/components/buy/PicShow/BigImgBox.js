import React from 'react';
import { connect } from "dva";
class BigImgBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAutoPlay:false
        }
    }
    // 门神函数
    shouldComponentUpdate(nextProps, nextState) {
        // 如果当前的图集id变化了，此时必须等carimages引发视图的变化
        if( nextProps.nowid != this.props.nowid){
            // 此处是判断点击后的图集与上次的是否一样，不一样的话，说明请求的新数据拉过来了，就可以render了。
            return nextProps.carimages != this.props.carimages;
        }
        return true;
    }
    componentWillUpdate({nowid,nowalbum,carimages,nowidx}, nextState) {
        // 小菊花 show
        $(this.refs.loading).show()
        // 对大图发出请求
        var image = new Image();
        var src = `carimages/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`;
        image.src = src;
        // 备份
        var self = this;
        // 当大图加载完后
        image.onload = function(){
            // 替换小图
            $(self.refs.bigimg).attr("src",src);
            // 小菊花 hide
            $(self.refs.loading).hide();
        }
    }
    render() {
        const {nowid,nowalbum,carimages,nowidx} = this.props;
        if(!carimages[nowalbum]) return null;

        // 计算图片总数
        const zongshu = carimages.view.length + carimages.inner.length + carimages.more.length + carimages.engine.length;
        // 图集序
        const arr = ["view","inner","engine","more"];
        // 当前所在的图集
        const albumidx = arr.indexOf(nowalbum);

        var zongxu = 0;
        for (var i = 0; i < albumidx; i++) {
            zongxu += carimages[arr[i]].length;
        };
        // 加上当前图集之前的值
        zongxu += nowidx + 1;
        // ***********************************************//

        return (
            <div className="bigImgBox">
                <div className="inner">
                    <img src={`carimages_small/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`}  className="bigimg" ref="bigimg"/>
                    <p className="loading" ref="loading"></p>
                    <div onClick={()=>{this.props.dispatch({"type":"picshow/goPrev"})}} className="leftBtn"></div>
                    <div onClick={()=>{this.props.dispatch({"type":"picshow/goNext"})}} className="rightBtn"></div>
                    <div className="picnumber">
                        {zongxu}/{zongshu}
                    </div>
                    <div className="autoPlay">
                        {
                            this.state.isAutoPlay
                            ?
                            <img src="/images/zanting.svg"
                                onClick={()=>{
                                    this.setState({isAutoPlay:false});
                                    clearInterval(this.timer);
                                }}
                             />
                            :
                            <img src="/images/bofang.svg"
                                onClick={()=>{
                                    this.setState({isAutoPlay:true})
                                    var self = this;
                                    this.timer = setInterval(function(){
                                        self.props.dispatch({"type":"picshow/goNext"});
                                    },1000)
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow:{nowid,nowalbum,carimages,nowidx}})=>({
        nowid,nowalbum,carimages,nowidx
    })
)(BigImgBox);