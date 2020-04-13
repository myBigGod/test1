const express = require("express");
const app = express();
const port = process.env.port || 5003;  //process.env.PORT：读取当前目录下环境变量port的值
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

//cors
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

//user模块 
const user = require("./routes/api/user");
//profiles模块
const profile = require("./routes/api/profiles");

//post中间件
app.use(bodyParser.urlencoded({extended:false})); //解析文本格式，当设置为false时，会使用querystring库解析URL编码的数据；
                                                  //当设置为true时，会使用qs库解析URL编码的数据。后没有指定编码时，使用此编码。默认为true
app.use(bodyParser.json());  //指定请求类型 使用json解析

//路由引用
app.use("/api/user",user);
app.use("/api/profile",profile);

//
app.get("/",(req,res)=>{
    res.json({
        msg:"欢迎访问！"
    });
});



//连接数据库
mongoose.connect("mongodb://localhost:27017/runoob")
    .then(()=>{
        console.log("连接成功！");
    })
    .catch(err=>{
        console.log(err);
    });

//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

//监听端口
app.listen(port,()=>{
    console.log(`端口 ${port} 现在可以访问！`);
});