var fs = require("fs");
var path = require("path");
var Mock = require('mockjs');
var Random = Mock.Random;

// 准备写入文件的地址
var xieruwenjianURL = path.resolve(__dirname,"./生成的车主模拟数据.txt");
// 如果已经要要写入的文件存在，就删除准备写入的文件
// fs.existsSync() 表示判断文件是否存在
// fs.unlinkSync() 表示删除文件
if( fs.existsSync(xieruwenjianURL) ){
    fs.unlinkSync(xieruwenjianURL)
};
console.log("原来生成的生成的车主模拟数据.txt已经删除看，开始写入新的数据了");

for (var i = 0; i < 5000; i++) {

    var o = {
        "id":10000 + i,
        "name": Random.cname(),
        "mobile":Mock.mock(/^((13[0-9])|(14[57])|(15[0-9])|(17[5-9])|(18[0-9]))\d{8}$/),
        "sex":Random.pick(["男","女"]),
        "city":Random.city(true),
        "idCard":Random.integer(100000000000000000,900000000000000000),
        "email":Random.email()

    }
    fs.appendFileSync(xieruwenjianURL,JSON.stringify(o) + "\n\r")
};
console.log("已写入5000条新数据在生成的车主模拟数据.txt");