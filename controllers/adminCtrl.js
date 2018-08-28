var formidable = require("formidable");
var path = require("path");
var Admin = require("../models/Admin.js");
var gm = require("gm");

exports.up = function(req,res){
    var form = new formidable.IncomingForm();
    // 设置图片的上传路径
    form.uploadDir = path.resolve(__dirname,"../www/uploads");
    // 保留文件的拓展名
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
        // 得到图片上传之后的文件名，因为上传后文件的名字改变了
        var base = path.parse(files.adminavatar.path).base;
        // 我们现在得到图片的真实的宽度和高度
        gm(path.resolve(__dirname,"../www/uploads/"+base)).size(function(err,size){
            res.send("<script>window.parent.onUpDone('"+base+"',"+size.width+","+size.height+");</script>")
        })

    })
};
// 裁切图片
exports.docut=function(req,res){
    var form = new formidable.IncomingForm();

     form.parse(req,function(err,{w,h,l,t,picurl},files){

        // 命令gm裁切 ，crop 表示裁切 write 表示写
        gm(path.resolve(__dirname,"../www/uploads/"+picurl))
        .crop(w,h,l,t)
        .resize(160,160)
        .write(path.resolve(__dirname,"../www/avatars/"+picurl),function(){
            // 改变数据库中存
            Admin.update({"email":"huang@163.com"},{"$set":{"avatar":picurl}},function(){
                res.json({
                    "result":1
                })
            })
        })
     })
}
// 得到头像
exports.getAvatar = function(req,res){

    // 读数据库
    Admin.find({"email":"huang@163.com"},function(err,docs){
        if(docs[0].avatar){
            var avatar = path.resolve(__dirname,"../www/avatars/"+docs[0].avatar);
        }else{
            var avatar = path.resolve(__dirname,"../www/avatars/defaultAvatar.webp");
        }
        // 直接返回这个头像本身
        res.sendFile(avatar);
    })
}