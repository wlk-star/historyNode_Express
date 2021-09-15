var express = require("express");
var router = express.Router();

// 连接数据库配置
var mysql = require("mysql");
var models = require("../mysql/db");
// 打包SQL语句
var $sql = require("../mysql/sqlMap");
// 连接数据库
var connection = mysql.createConnection(models.onlineNote);

connection.connect();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.user.getUser;
  connection.query(sql, [user.id], function (err, result) {
    if(err){
      res.status(500).json({ msg: "用户名/密码错误",code: "500" }).end();
    }
    if(result.length>0){
      console.log(result);
      res.status(200).json({ msg: "success",code: "200",data:result[0] }).end();
    }else{
      console.log("null");
      res.status(200).json({ msg: "用户名/密码错误",code: "500",data:{ msg: 'aaaaa'} }).end();
    }
  })
});
// 用户注册
router.post("/reg", function (req, res, next) {
  // object
  console.log(req.body);
  const {password,reCode,sessionId} = req.body;
  const username = JSON.parse(sessionId).phoneNumber;
  console.log(username);
  const sql = $sql.user.register;
  connection.query(sql, [username, password], function (err, result) {
    if (err) {
      res.status(500).json({ msg: "用户已存在",code: "500" }).end();
    }
    if (result) {
      console.log(result);
      res.status(200).json({ msg: "success",code: "200" }).end();
    }
  });
});

router.post("/login",function(req,res,next){
  console.log(req.body);

  const {phone,password} = req.body;
  const sql = $sql.user.login;
  connection.query(sql, [phone, password], function (err, result) {
    if(err){
      res.status(500).json({ msg: "用户名/密码错误",code: "500" }).end();
    }
    if(result.length>0){
      console.log(result);
      res.status(200).json({ msg: "success",code: "200",data:result[0] }).end();
    }else{
      console.log("null");
      res.status(200).json({ msg: "用户名/密码错误",code: "500",data:{ msg: 'aaaaa'} }).end();
    }
  })
})

module.exports = router;
