
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', //数据库地址
    port: '3306',//端口号
    user: 'root',//用户名
    password: 'root',//密码
    database:  'historical_events',//数据库名称
});
connection.connect();

var sql = 'SELECT * FROM websites';
var str = '';
connection.query(sql, function(err, result) {
   if (err) {
       console.log('[SELECT ERROR]：', err.message);
   }
   str = JSON.stringify(result);
   console.log(result);
})