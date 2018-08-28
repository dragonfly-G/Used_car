import React from 'react';
import User from "../../../containers/User.js";
export default class AddList extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <User k="adduser" c="添加用户">
                <div>
                    添加用户
                </div>
            </User>
        );
    }
}
