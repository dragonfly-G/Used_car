var fs = require("fs");
var url = require('url');
var path = require('path');
var User = require("../models/User.js");
// 查询用户
exports.users = function(req,res){
    // GET请求
    var page = url.parse(req.url,true).query.page || 1;
    var pagesize = url.parse(req.url,true).query.pagesize || 10;
    var sortby = url.parse(req.url,true).query.sortby || "id";
    var sortdirection = url.parse(req.url,true).query.sortdirection || 1;
    var keyword = url.parse(req.url,true).query.keyword || "";

    // console.log(page,pagesize,sortby,sortdirection,keyword);
    // 将字符串真的编程正则，就是new RegExp()
    var keywordRegExp = new RegExp(keyword,"g");

    // 插叙对象
    var CHAXUN = {
        "$or":[
            {"name":keywordRegExp},
            {"moblie":keywordRegExp},
            {"idCard":keywordRegExp},
            {"city":keywordRegExp}
        ]
    }
    // 数据统计，再查询
    User.count(CHAXUN,function(err,total){
        User.find(CHAXUN)
        // 排序的1表示从小到大，-1反之。
        .sort({[sortby]:sortdirection == "ascend" ? 1 : -1})
        // 跳过多少条
        .skip(pagesize * (page - 1))
        // 限时输出多少条
        .limit(pagesize)
        // 输出
        .exec(function(err,docs){
            res.json({
                total,
                "results":docs
            })
        })
    })

}