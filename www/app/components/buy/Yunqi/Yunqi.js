import React from 'react';
import Buy from "../../../containers/Buy.js";
export default class Zhuanjia extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Buy k="yunqi" c="运气选车">
                <div>
                    运气选车
                </div>
            </Buy>

        );
    }
}
