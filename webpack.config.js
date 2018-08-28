const path = require("path");
module.exports = {
    // 入口文件
    entry:"./www/app/main.js",
    // 出口文件
    output:{
        // 出口的文件夹
        // path:path.resolve(__dirname,"www/dist"),
        //出口的文件名字
        filename:"bundle.js",
        publicPath:"xuni"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                // babel的loader
                loader: "babel-loader",
                include:[
                    path.resolve(__dirname,"www/app")
                ],
                exclude:[
                    path.resolve(__dirname,"node_modules")
                ],
                //loader的配置项
                options: {
                    presets: ["env","react"],
                    plugins:["transform-object-rest-spread","transform-runtime"]
                }
            },
            {
                test: /\.less$/,
                include:[
                    path.resolve(__dirname,"www/app")
                ],
                exclude:[
                    path.resolve(__dirname,"node_modules")
                ],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader", options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }]
            }
        ]
    },
    // watch:true,
    mode :"development",
    devServer:{
         proxy:{
             "/api":{
                 target: 'http://127.0.0.1:3000',
                 changeOrigin: true,
                 pathRewrite:{
                     "^/api":"/"
                 }
             }
         }
     }
};