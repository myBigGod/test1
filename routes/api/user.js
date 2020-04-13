const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");

//数据库
const User = require("../../models/User")

//bcrypt密码加密 引用
const bcrypt = require("bcrypt");

route.get("/test",(req,res)=>{
    res.json({
        mes:"test"
    });
});




//注册模块
route.post("/register",(req,res)=>{
    console.log(req.body);
   // 查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册!');
    } else {

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        identity: req.body.identity
      });
    
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//登陆模块
route.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(404).json('用户不存在1!');
      }
  
      // 密码匹配
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const rule = {
            id: user.id,
            name: user.name,
            identity: user.identity
          };
          jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          });
          // res.json({msg:"success"});
        } else {
          return res.status(400).json('密码错误!');
        }
      });
    });
  });

//token请求特殊模块
route.get("/token",passport.authenticate("jwt",{ session:false }),(req,res)=>{
    res.json(req.user);
})

module.exports=route;