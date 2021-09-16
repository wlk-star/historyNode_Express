var express = require('express')
var router = express.Router()

// 连接数据库配置
var models = require('../mysql/db')
var mysql = require('mysql')
// 打包SQL语句
var $sql = require('../mysql/sqlMap')
// 连接数据库
var connection = mysql.createConnection(models.onlineNote)

connection.connect()

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' })
  // res.send('index')
})

router.get('/period', function (req, res, next) {
  const sql = $sql.history.getPeriod
  connection.query(sql, [], function (err, result) {
    if (err) {
      res.status(500).json({ msg: '获取失败', code: '500' }).end()
      return
    } else {
      res
        .status(200)
        .json({
          msg: 'success',
          code: '200',
          data: result,
        })
        .end()
    }
  })
})
router.get('/events', function (req, res, next) {
  // 需要接收period的id，才能匹配到对应的事件
  const sql = $sql.history.getEvents

  const { periodId } = req.query
  connection.query(sql, [periodId], function (err, result) {
    if (err) {
      res.status(500).json({ msg: '获取失败', code: '500' }).end()
      return
    } else {
      res
        .status(200)
        .json({
          msg: 'success',
          code: '200',
          data: result,
        })
        .end()
    }
  })
})

module.exports = router
