import React from 'react';
import Buy from "../../../containers/Buy.js";
export default class Zhuanjia extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Buy k="sifa" c="司法拍卖">
                <div>
                    司法拍卖
                </div>
            </Buy>
        );
    }
}
