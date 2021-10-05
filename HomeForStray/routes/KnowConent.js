var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

router.get('/', function (req, res, next) {
  var id = req.query.id;  //取得傳送的資料id
  var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
  pool.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
    var memberData = results[0]; // 撈取是否有登入session


    pool.query('select * from articlenews where ArticleId=?', [id], function (err, results) {  //根據id讀取資料
      if (err) throw err;

      var oneArticles = results[0];
      pool.query('select * from articlenews order by ArticleHits desc limit 0, 3', [id], function (err, results) {
        console.log(results);
        res.render('KnowConent',
          {
            data: oneArticles,
            memberData: memberData || "",
            pageNo: pageNo,
            hotdata: results,
            
          });  //傳送pageNo給返回首頁使用(回到原來頁面)
          
          setTimeout(function () { //讀取資料庫動作需時間,故延遲1秒才更新資料庫
          hits = results[0].ArticleHits + 1;  //將原來點擊數加1
          console.log(results[0].ArticleHits)

          pool.query('update articlenews set ? where ArticleId=?', [{ ArticleHits: hits }, id], function (err, results) {  //ejs語法,更新資料庫
            if (err) throw err;
          });
        }, 1000);
      });
    });
  });
});
module.exports = router;