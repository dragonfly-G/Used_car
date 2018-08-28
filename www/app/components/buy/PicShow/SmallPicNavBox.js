import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class SmallPicNavBox extends React.Component {

    constructor(props) {
        super(props);
        // 第几页
        this.page = 0;
    }
    componentWillReceiveProps(nextProps) {
        // 计算page
        this.page = Math.floor(nextProps.nowidx / 4);
    }
    // DOM拉动已经变化了，拉花到默认的位置。
    componentDidUpdate(prevProps, prevState) {
        $(this.refs.unit).stop(true).animate({"left":-310*this.page},300);
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
    //组件上树之后
    componentDidMount() {
        var self = this;
        // 事件委托，让每一个span被触碰有时间发生
        $(this.refs.navbar).on("mouseenter","span",function(){
            // data("i")等价于 $(this).attr("data-i");
            var i = $(this).data("i");
            // 拉动
            $(self.refs.unit).stop(true).animate({"left":-310*i},300);
            //给自己加cur
            //美化层面上的东西，不改变我们的state的任何数据的控制，我们不会发送dispatch。
            $(this).addClass('cur').siblings().removeClass('cur');

        });
        // 当鼠标离开大盒子的时候，拉动当前的位置，cur复位
        $(this.refs.smallPicNavBox).mouseleave(function(){
            $(self.refs.unit).stop(true).animate({"left":-310*self.page},300);
            $(self.refs.navbar).find("span").eq(self.page).addClass('cur').siblings().removeClass('cur');

        });
    }
    render() {
        // 解构
        const { nowalbum,carimages,nowid,nowidx } = this.props;
        // 如果这个数组还没有（MOUNTING阶段数据还没有回来）
        if(!carimages[nowalbum]) carimages[nowalbum] = [];
        // 显示ul和li， 将一维数组变为二维数组 ，4个4个截断
        const arr = carimages[nowalbum];
        // 总页面
        const pageAmount = Math.ceil(arr.length / 4 );

        // 每个ul中有4个li。
        const showUlLis = ()=>{
            var DOMARR = [];
            for (let i = 0; i < pageAmount; i++) {
                    DOMARR.push(
                            <ul key={i}>
                                {
                                    arr.slice(i*4,i*4+4).map((item,index)=>{

                                        return <li
                                            key={index}
                                            className = {cn({"cur": i*4+index == nowidx})}
                                            onClick= {()=>{ this.props.dispatch({"type":"picshow/changeNowIdx","nowidx":i*4+index})}}
                                        >
                                            <img src={`carimages_small/${nowid}/${nowalbum}/${arr[i*4+index]}`} />
                                        </li>
                                    })
                                }
                            </ul>

                        )
            };
            return DOMARR;
        };
        const showSpans = ()=>{
            var DOMARR = [];
            for (var i = 0; i < pageAmount; i++) {
                if( pageAmount == 1) return null;
                    DOMARR.push(
                            <span
                                key={i}
                                className={cn({"cur":i == this.page })}
                                data-i={i}
                                style={{"width":(300 - (pageAmount - 1) * 5 ) / pageAmount + "px"}}
                            >
                            </span>
                        )
            };
            return DOMARR;
        }
        return (
            <div className="smallPicNavBox" ref="smallPicNavBox">
                <div className="unit" ref="unit">
                    {showUlLis()}
                </div>
                <div className="navbar" ref="navbar">
                    {showSpans()}
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow:{nowalbum,carimages,nowid,nowidx}})=>({
        nowalbum,
        carimages,
        nowid,
        nowidx
    })
)(SmallPicNavBox);