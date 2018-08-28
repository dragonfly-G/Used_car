var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
// mongoose 的model文件
var Car = require("../models/Car.js");

// 显示汽车有哪些图片的额接口
exports.showCarImages = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;

    Car.find({"id":orderId},function(err,docs){
        res.json({
            "images":docs[0].images
        })
    })
};
// 显示指定汽车ID的信息
exports.showCarInfo = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;

    Car.find({"id":orderId},function(err,docs){
        res.json({
            "result":docs[0]
        })
    })
}
// 显示指定ID汽车的相似车，相似车的定义：品牌一样、车系一样。
exports.showCarLike = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;

    Car.find({"id":orderId},function(err,docs){
        var brand = docs[0].brand;
        var series = docs[0].series;
        // 然后寻找和它一样的车
        Car.find({brand,series},function(err,docs){
            res.json({
                "results":docs
            })
        })
    })
}

exports.carsearch = function(req,res){
    // 识别前端发过来的请求体的数据
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var nowfilters = fields.nowfilters;
        // 得到前端发来的分页信息
        var pagination = fields.pagination;
        // 得到前端的排序信息
        var sorter = fields.sorter;
        // 查询体
        var CHAXUNTI = {};
        //现在的工作就是遍历数组将对象生成。
        nowfilters.forEach(item=>{
            CHAXUNTI[item.k] = item.v;
            // 验收是否是km，如果是要乘以10000
            if( item.k == "km"){
                item.v[0] *= 10000;
                item.v[1] *= 10000;
            };
            //这里验收有范围的条件
            if(  item.k == "km" || item.k == "price" || item.k == "buydate"){

                CHAXUNTI[item.k] = {"$gte":Number(item.v[0]),"$lte":Number(item.v[1])}
            }
            //验证是否上牌照。将中文变为布尔值
            if(item.k == "license"){
               CHAXUNTI[item.k] = item.v == "是" ? true : false;
            }
        });
        Car.count(CHAXUNTI,function(err,total){
            Car.find(CHAXUNTI)
            // 排序的1表示从小到大，-1反之。
            .sort({[sorter.sortby]:sorter.sortdirection == "ascend" ? 1 : -1})
            // 跳过多少条
            .skip(pagination.pagesize * (pagination.page - 1))
            // 限时输出多少条
            .limit(pagination.pagesize)
            // 输出
            .exec(function(err,docs){

                res.json({
                    total,
                    "results":docs
                })
            })
        })
    })
};

exports.uploadcarimages = function(req,res){

    var form = new formidable.IncomingForm();
    // 上传文件夹
    form.uploadDir = path.resolve(__dirname,"../www/uploads");
    //保留文件的拓展名
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
        res.json({
            "result":1,
            "base":path.parse(files.viewpics.path).base
        })
    })
}

exports.uploadcarfiles= function(req,res){

    var form = new formidable.IncomingForm();
    // 上传文件夹
    form.uploadDir = path.resolve(__dirname,"../www/carfiles");
    //保留文件的拓展名
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
        res.json({
            "result":1,
            "base":path.parse(files.carfiles.path).base,
            "ext":path.parse(files.carfiles.path).ext
        })
    })
}

exports.addcar = function(req,res){

    var uploadsbase = path.resolve(__dirname,"../www/uploads");
    var carimagesbase = path.resolve(__dirname,"../www/carimages");
    var carimagessmallbase = path.resolve(__dirname,"../www/carimages_small");

    Car.count({},function(err,count){

        // 生成现有的ID
        var id = count + 1000000 + 1;

        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            var form0 = JSON.parse(fields.form0);
            var form1 = JSON.parse(fields.form1);
            var form2 = JSON.parse(fields.form2);

            // 创建文件夹
            fs.mkdirSync(carimagesbase + "/" + id);
            fs.mkdirSync(carimagesbase + "/" + id + "/view");
            fs.mkdirSync(carimagesbase + "/" + id + "/inner");
            fs.mkdirSync(carimagesbase + "/" + id + "/engine");
            fs.mkdirSync(carimagesbase + "/" + id + "/more");

            fs.mkdirSync(carimagessmallbase + "/" + id);
            fs.mkdirSync(carimagessmallbase + "/" + id + "/view");
            fs.mkdirSync(carimagessmallbase + "/" + id + "/inner");
            fs.mkdirSync(carimagessmallbase + "/" + id + "/engine");
            fs.mkdirSync(carimagessmallbase + "/" + id + "/more");

            // 移动文件， 复制两份
            for (var i = 0; i < form1.view.length; i++) {
                fs.copyFileSync(uploadsbase + "/" + form1.view[i] , carimagesbase + "/" + id + "/view/" + form1.view[i]);
                fs.copyFileSync(uploadsbase + "/" + form1.view[i] , carimagessmallbase + "/" + id + "/view/" + form1.view[i]);
            };

            for (var i = 0; i < form1.inner.length; i++) {
                fs.copyFileSync(uploadsbase + "/" + form1.inner[i] , carimagesbase + "/" + id + "/inner/" + form1.inner[i]);
                fs.copyFileSync(uploadsbase + "/" + form1.inner[i] , carimagessmallbase + "/" + id + "/inner/" + form1.inner[i]);
            };

            for (var i = 0; i < form1.engine.length; i++) {
                fs.copyFileSync(uploadsbase + "/" + form1.engine[i] , carimagesbase + "/" + id + "/engine/" + form1.engine[i]);
                fs.copyFileSync(uploadsbase + "/" + form1.engine[i] , carimagessmallbase + "/" + id + "/engine/" + form1.engine[i]);
            };

            for (var i = 0; i < form1.more.length; i++) {
                fs.copyFileSync(uploadsbase + "/" + form1.more[i] , carimagesbase + "/" + id + "/more/" + form1.more[i]);
                fs.copyFileSync(uploadsbase + "/" + form1.more[i] , carimagessmallbase + "/" + id + "/more/" + form1.more[i]);
            };
            console.log(form0);
            // 写入数据库
            Car.create({
                "brand":form0.brandandseries.value[1],
                "series":form0.brandandseries.value[2],
                "price":form0.price1.value,
                "images":form1,
                "id":id,
                "avator":form1.view[0],
                "buydate":Date.parse(form0.buydate.value),
                "carfiles":form2
            },function(){
                res.json({"result":1})
            })
        })
    })
}