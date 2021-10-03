var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

router.get('/', function(req, res, next) {
  var id = req.query.id;  //取得傳送的資料id
  var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
  pool.query('select * from articlenews where ArticleId=?', [id], function(err, results) {  //根據id讀取資料
    if(err) throw err;
    res.render('KnowConent', { data:results, pageNo:pageNo});  //傳送pageNo給返回首頁使用(回到原來頁面)
    
  });
});

module.exports = router;