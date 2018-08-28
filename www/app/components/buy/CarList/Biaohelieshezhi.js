import React from 'react';

export default class Biaohelieshezhi extends React.Component {

    constructor(props) {
        super(props);
    }
    // 组件上树之后
    componentDidMount() {
        var self = this;
        $(this.refs.ul1).sortable({
            connectWith:"ul",
            stop:function(){
                var arr = [];
                $(self.refs.ul1).find("li").each(function(){
                    arr.push($(this).data("key"))
                });
                // 这里每当用户改变ul1顺序的时候，立即改变父亲的临时数组
                self.props.setArr(arr);
            }
        });
        $(this.refs.ul2).sortable({
            connectWith:"ul",
            dropOnEmpty:false,
            stop:function(){
                var arr = [];
                $(self.refs.ul1).find("li").each(function(){
                    arr.push($(this).data("key"))
                });
                // 这里每当用户改变ul1顺序的时候，立即改变父亲的临时数组
                self.props.setArr(arr);
            }
        });
        // 禁用选择匹配的元素集合内的文本内容
        $(this.refs.ul1,this.refs.ul2).disableSelection();
    }
    render() {
        const kvObj = {
            "id":"编号",
            "avatar":"缩略图",
            "type":"车型",
            "seat":"座位数",
            "brand":"品牌车系",
            "color":"颜色",
            "price":"售价",
            "km":"里程",
            "engine":"发动机",
            "buydate":"购买日期",
            "license":"是否上牌",
            "exhaust":"排放标准",
            "gearbox":"变速箱",
            "fuel":"燃料"
        }
        // 显示没有的那些列的值
        var nohas = Object.keys(kvObj).filter(item=>!this.props.arr.includes(item));
        return (
            <div className="biaohelieshezhi">
                <h3>当前:</h3>
                <ul className="ul1" ref="ul1" style={{"minHeight":"30px"}}>
                    {
                        this.props.arr.map((item,index)=>{
                            return <li
                                key={index}
                                className="ui-state-default"
                                data-key={item}
                            >
                                {kvObj[item]}
                            </li>
                        })
                    }
                </ul>
                <h3>可以选择：</h3>
                <ul className="ul2" ref="ul2" style={{"minHeight":"30px"}}>
                    {
                        nohas.map(item=>{
                            return <li
                                key={kvObj[item]}
                                className="ui-state-default"
                                data-key={item}
                            >
                            {kvObj[item]}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}


