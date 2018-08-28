var express = require("express");
var mongoose = require("mongoose");
// 链接数据库 ershouche
mongoose.connect("localhost/ershouche");
// 引入控制器
var carCtrl = require("./controllers/carCtrl.js");
var adminCtrl = require("./controllers/adminCtrl.js");
var userCtrl = require("./controllers/userCtrl.js");
var app = express();
app.use(express.static("www"));
// 路由的中间件
app.get("/carimages/:orderId",carCtrl.showCarImages);
app.get("/carinfo/:orderId",carCtrl.showCarInfo);
app.get("/carlike/:orderId",carCtrl.showCarLike);
app.post("/carsearch",carCtrl.carsearch);
// 上传的图片文件
app.post("/uploadcarimages",carCtrl.uploadcarimages);
// 上传汽车文件
app.post("/uploadcarfiles",carCtrl.uploadcarfiles);
// 上传汽车所有的信息
app.post("/addcar",carCtrl.addcar);

app.post("/up",adminCtrl.up);
app.post("/docut",adminCtrl.docut);
app.get("/getAvatar",adminCtrl.getAvatar);

app.get("/users",userCtrl.users);

app.listen(3000,function(){
    console.log("服务器在3000端口开启了");
})