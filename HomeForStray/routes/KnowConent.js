var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

router.get('/', function (req, res, next) {
  var id = req.query.id;  //取得傳送的資料id
  var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
  pool.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
    var memberData = results[0]; // 撈取是否有登入session


    pool.query('select * from articlenews where ArticleId=?;select * from articlenews order by ArticleId desc limit 0, 3', [id], function (err, results) {  //根據id讀取資料
      if (err) throw err;
      res.render('KnowConent', 
      { data: results[0], 
        memberData : memberData || "" ,
        pageNo: pageNo, 
        hotdata: results[1], });  //傳送pageNo給返回首頁使用(回到原來頁面)
    });
  });
});

module.exports = router;