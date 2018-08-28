import React from 'react';
import { connect } from "dva";
import { Radio , Row , Col ,Pagination } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // 网格结构
            "col":4,
            "row":5,
            "value":"A"
        }
    }

    render() {
        // 显示小格格的内容
        const showGridContent = (n)=>{
            const thecar = this.props.cars[n];
            if(!thecar) return null;
            return <div>
                <Row>
                    <Col span={18} offset={3}>
                        <img src={`/carimages_small/${thecar.id}/view/${thecar.avatar}`}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <h4>{thecar.brand}</h4>
                        <h4>{thecar.series}</h4>
                        <h4>{thecar.km}</h4>
                        <h4>{thecar.price}</h4>
                    </Col>
                </Row>
            </div>
        }
        var ARR = [];
        for (var i = 0; i < this.state.row; i++) {
            var temp = [];
            for (var j = 0; j <  this.state.col;j++) {
                temp.push(
                        <Col key={j} className="grid" span={24/this.state.col}>
                            {showGridContent(i*this.state.col +j)}
                        </Col>
                    )
            };
            ARR.push(<Row key={i}>{temp}</Row>)
        };

        return (
            <div>
                <RadioGroup onChange={(e)=>{
                    this.setState({
                        "col":e.target.col,
                        "row":e.target.row,
                        "value":e.target.value
                    })
                    this.props.dispatch({"type":"carlist/changePage",page:this.props.pagination.page,pagesize:e.target.col*e.target.row})
                }} value={this.state.value}>
                   <RadioButton value="A" col="4" row="5">4*5</RadioButton>
                   <RadioButton value="B" col="3" row="5">3*5</RadioButton>
                   <RadioButton value="C" col="2" row="5">2*5</RadioButton>
                </RadioGroup>
                {ARR}
                <Pagination
                    current={this.props.pagination.page}
                    total={this.props.pagination.total}
                    pageSize = {this.props.pagination.pagesize}
                    onChange = {(page)=>{
                        this.props.dispatch({"type":"carlist/changePage",page:page,pagesize:this.state.row*this.state.col})
                    }}
                ></Pagination>

            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        "pagination":carlist.pagination,
        "cars":carlist.cars
    })
)(Grid);