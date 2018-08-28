import React from "react";
import dva from "dva";
import logger from "redux-logger";
import router from "./router.js";
import picshowModel from "./models/picshowModel.js";
import carlistModel from "./models/carlistModel.js";
import uselistModel from "./models/uselistModel.js";
import addCarModel from "./models/addCarModel.js";



// 创建dva的app对象
const app = dva({
    // onAction:logger
});
// 注册路由
app.router(router);
//注册模型
app.model(picshowModel);
app.model(carlistModel);
app.model(uselistModel);
app.model(addCarModel);
// 挂载
app.start("#app");