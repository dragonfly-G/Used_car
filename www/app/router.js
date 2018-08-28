import React from "react";
import {Router ,Switch , Route} from "dva/router";
import Index from "./containers/Index.js";
// 买车
import CarList from "./components/buy/CarList/CarList.js";
import Zhuanjia from "./components/buy/Zhuanjia/Zhuanjia.js";
import Yunqi from "./components/buy/Yunqi/Yunqi.js";
import Sifa from "./components/buy/Sifa/Sifa.js";

import AddCar from "./components/sale/AddCar/AddCar.js";
import Gujia from "./components/sale/Gujia/Gujia.js";
import Yijian from "./components/sale/Yijian/Yijian.js";
import Zhuanrang from "./components/sale/Zhuanrang/Zhuanrang.js";

// 用户
import UserList from "./components/user/UserList/UserList.js";
import AddList from "./components/user/AddList/AddList.js";

// 管理员
import Admin from "./components/Adminprofile/Adminprofile.js";
// const history = createHistory()
export default ({history ,app })=>{
    return <Router history={history}>
        <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route exact path="/buy/carlist" component={CarList}></Route>
            <Route exact path="/buy/zhuanjia" component={Zhuanjia}></Route>
            <Route exact path="/buy/yunqi" component={Yunqi}></Route>
            <Route exact path="/buy/sifa" component={Sifa}></Route>

            <Route exact path="/sale/AddCar" component={AddCar}></Route>
            <Route exact path="/sale/Gujia" component={Gujia}></Route>
            <Route exact path="/sale/Yijian" component={Yijian}></Route>
            <Route exact path="/sale/Zhuanrang" component={Zhuanrang}></Route>

            <Route exact path="/user/UserList" component={UserList}></Route>
            <Route exact path="/user/AddList" component={AddList}></Route>

            <Route exact path="/admin" component={Admin}></Route>
        </Switch>
    </Router>
}