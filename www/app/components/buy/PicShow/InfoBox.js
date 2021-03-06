import React from 'react';
import { connect } from "dva";
class InfoBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {carinfo,nowid} = this.props;
        if(!carinfo) return null;
        return (
            <div className="infoBox">
                <h3>
                    {carinfo.brand}{carinfo.series}
                    <small>{nowid}</small>
                </h3>
                <div className="info">
                    {carinfo.color}色
                    {new Date(carinfo.buydate).getFullYear()}年
                    {Math.round(carinfo.km/10000)}万公里
                    {carinfo.price}万元
                    {carinfo.engine}
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        "carinfo":picshow.carinfo,
        "nowid":picshow.nowid
    })
)(InfoBox);