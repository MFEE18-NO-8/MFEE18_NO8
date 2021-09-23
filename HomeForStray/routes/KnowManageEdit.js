var express = require('express');
 var router = express.Router();
 var mysql = require('mysql');
 var pool = require('./lib/db.js');
 
 var id = 0;
 
 router.get('/', function(req, res, next) {
   var categories = ['標題', '發布日期', '內容', '狀態'];
   id = req.query.id;  //取得傳送的資料id
   var pageNo = parseInt(req.query.pageNo);

   pool.query('select * from articlenews where ArticleId=?', [id], function(err, results) {  //根據id讀取資料
     if(err) throw err;
     res.render('KnowManageEdit', { data:results, pageNo:pageNo, categories:categories});
   });
 });
 
 router.post('/', function(req, res, next) {
   var pageNo = parseInt(req.query.pageNo);
   var articleTitle = req.body['articleTitle'];  //取得輸入的類型
   var articleDate = req.body['articleDate'];
   var articleContent = req.body['articleContent'];

   
   pool.query('update articlenews set ? where ArticleId=?', [{  //更新資料
       ArticleTitle:articleTitle,
       ArticleDate: articleDate,
       ArticleCont:articleContent,
     }, id] , function(err, results) {
       if(err) throw err;
       res.redirect('/KnowManageList');  //回到原來頁數的管理頁面
   });
 });
 
 module.exports = router;