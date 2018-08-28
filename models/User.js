var mongoose = require("mongoose");
// 为什么都是字符串类型，因为方便find 正则匹配。
module.exports = mongoose.model("User",{
    "id":Number,
    "name":String,
    "mobile":String,
    "sex":String,
    "email":String,
    "city":String,
    "idCard":String
})