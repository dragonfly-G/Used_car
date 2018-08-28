import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class CarLikeBox extends React.Component {

    constructor(props) {
        super(props);
        // 组件的属性是为了多个生命周期相互传值的。
        this.boxH = 0;
        this.bH = 0;
        this.rate = 0;
    }
    // 组件上树之后，添加两个事件监听。
    componentDidMount() {
        var self = this;
        const $ul = $(this.refs.ul);
        const $b = $(this.refs.b);
        this.top = 0;
        // 让$b (滑块)可以被拖拽
        $b.draggable({
            "containment":"parent",
            "drag":function(event,ui){
                // 当前滑块的位置
                self.top  = ui.position.top;
                // 让ui按比例移动
                $ul.css("top",-self.top * self.rate)
            }
        });
        // 鼠标滚轮
        $(this.refs.box).mousewheel(function(event,delta){
            // 鼠标滚轮滚动的时候 delta是-1
            //鼠标向下滚轮滚动，box的top是负数
            self.top -=  delta * 10;
            // 验收
            if( self.top < 0){ self.top = 0};
            if( self.top > self.boxH - self.bH){ self.top = self.boxH - self.bH};
            $ul.css("top",-self.top * self.rate);
            $b.css("top",self.top);

        })

        // console.log($ul.height());
    }
    // 数据来，render之后生命周期
    componentDidUpdate(prevProps, prevState) {
        // 得到内容的高度
        this.ulH = $(this.refs.ul).height();
        // 得到盒子的高度，
        this.boxH = $(this.refs.box).height();
        //比例
        this.rate = this.ulH / this.boxH //应该大于1
        // 如果小于1，说明不需要滑道和滑块，都隐藏
        if(this.rate <= 1){
            $(this.refs.bar).hide();
            $(this.refs.b).hide();
        }else{
            $(this.refs.bar).show();
            $(this.refs.b).show();
        }
        // 计算滑块的高度
        this.bH = this.boxH / this.rate;
        // 设置滑块的高度
        $(this.refs.b).css("height",this.bH);
    }
    render() {
        const { nowid , carlikes, dispatch} = this.props;
        return (
            <div className="carLikeBox" ref="box">
                <ul ref="ul">
                    {
                        carlikes.map(item=>{
                            return <li
                                key={item.id}
                                className={cn({"cur":nowid == item.id})}
                                onClick = {()=>{dispatch({"type":"picshow/init","nowid":item.id})}}
                            >
                               {item.color}色
                               {new Date(item.buydate).getFullYear()}年
                               {Math.round(item.km/10000)}万公里
                               {item.price}万元
                               {item.engine}
                            </li>
                        })
                    }
                </ul>
                <div className="bar">
                    <b ref="b"></b>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        "carlikes":picshow.carlikes,
        "nowid":picshow.nowid
    })
)(CarLikeBox);