var fs = require("fs");
var path = require("path");
var Mock = require('mockjs');
var Random = Mock.Random;

// 得到汽车基数据，文件地址
var jishujuURL = path.resolve(__dirname,"./汽车基数据.json");
// 准备写入文件的地址
var xieruwenjianURL = path.resolve(__dirname,"./生成的车模拟数据.txt");
// 小图的公共的地址
var carimages_smallURl = path.resolve(__dirname,"../www/carimages_small");
// 如果已经要要写入的文件存在，就删除准备写入的文件
// fs.existsSync() 表示判断文件是否存在
// fs.unlinkSync() 表示删除文件
if( fs.existsSync(xieruwenjianURL) ){
    fs.unlinkSync(xieruwenjianURL)
};
console.log("原来生成的生成的车模拟数据.txt已经删除看，开始写入新的数据了");
// 读文件
fs.readFile(jishujuURL,function(err,content){
    // 读文件，并且变为真实的对象
    var arr = JSON.parse(content.toString());
    // 遍历数组，给每一个JSON文件添加一些随机的属性
    // 我们现在就是把原来的基数据丰富一下
    for (var i = 0; i < arr.length; i++) {
        // 随机增加一个【售价price】单位是万元，随机一个0.2万元到100万元精确至少2位，至多2位。
        arr[i].price = Random.float(0.2,100,2,2)
         // 随机增加一个【售价km】单位是公里
        arr[i].km = Random.integer(0,2000000);
        // 随机增加一个【车主的ID，ownerID】
        arr[i].ownerID = Random.integer(10000,14999);
        // 随机增加一个属性【引擎engine】
        arr[i].engine = Random.pick(["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","3.0","4.0","5.0"]);
        // 随机增加一个属性【购买日期】，注意时间戳，我们随机一个20年的数据
        arr[i].buydate = new Date() - Random.integer(0, 24 * 60 * 60 * 1000 * 365 * 20 )
        // 随机增加一个属性【是否带牌 license】
        arr[i].license = Random.boolean();
        // 随机增加一个属性【排气标准exhaust】
        arr[i].exhaust = Random.pick(["国一","国二","国三","国四","国五","国六"])
        //随机增加一个属性【变速箱】
        arr[i].gearbox = Random.pick(["自动","手动"]);
        //随机增加一个属性【燃料;fuel】
        arr[i].fuel = Random.pick(["汽油","柴油","油电混合","纯电动"]);
        // 增加一张汽车的形象图片
        arr[i].avatar = fs.readdirSync(`${carimages_smallURl}/${arr[i].id}/view`)[0];
        // 这个是车的图片的信息。
        arr[i].images = {
            "view":fs.readdirSync(`${carimages_smallURl}/${arr[i].id}/view`),
            "inner":fs.readdirSync(`${carimages_smallURl}/${arr[i].id}/inner`),
            "engine":fs.readdirSync(`${carimages_smallURl}/${arr[i].id}/engine`),
            "more":fs.readdirSync(`${carimages_smallURl}/${arr[i].id}/more`)
        };
        // 写入最终生成的文件
        fs.appendFileSync(xieruwenjianURL, JSON.stringify(arr[i]) + "\r\n");
    };
    console.log("已写入"+arr.length + "条新数据在生成的车模拟数据.txt");
})