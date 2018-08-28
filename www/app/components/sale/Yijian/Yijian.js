import React from 'react';
import Sale from "../../../containers/Sale.js";
export default class Yijian extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sale k="yijian" c="一键卖车">
                <div>
                    一键卖车
                </div>
            </Sale>
        );
    }
}
