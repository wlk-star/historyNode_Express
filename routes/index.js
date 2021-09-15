
var express = require('express');
var router = express.Router();

// 连接数据库配置
var models = require('../mysql/db');
var mysql = require('mysql');
// 打包SQL语句
var $sql = require('../mysql/sqlMap');
// 连接数据库
var connection = mysql.createConnection(models.onlineNote);

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
// console.log(new Date());

