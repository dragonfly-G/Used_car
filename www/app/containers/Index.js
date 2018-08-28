import React from 'react';

import App from "./App.js";
export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App k="index">
                我是首页
            </App>
        );
    }
}
