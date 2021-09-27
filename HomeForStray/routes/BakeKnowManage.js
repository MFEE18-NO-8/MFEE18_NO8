var express = require('express');
var router = express.Router();
var mysql = require('mysql');        //含入mysql套件
var pool = require('./lib/db.js');   //含入資料庫連線



// 毛孩知識後台清單
var linePerPage = 5;  // 每頁資料筆數

router.get('/KnowManageList', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
    if (isNaN(pageNo) || pageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        pageNo = 1;
    }

    pool.query('select count(*) as cnt from articlenews', function (err, results) {  //讀取資料總筆數
        if (err) throw err;
        var totalLine = results[0].cnt;  //資料總筆數
        var totalPage = Math.ceil(totalLine / linePerPage);  //總頁數

        pool.query('select * from articlenews order by ArticleId desc limit ?, ?;',
            [(pageNo - 1) * linePerPage, linePerPage],
            function (err, results) {  //根據目前頁數讀取資料
                if (err) throw err;
                res.render('KnowManageList', {
                    data: results,
                    pageNo: pageNo,
                    totalLine: totalLine,
                    totalPage: totalPage,
                    linePerPage: linePerPage
                });
            });
    });
});


// 毛孩知識後台新增
var message = '';

router.get('/KnowManageAdd', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    res.render('KnowManageAdd', { pageNo: pageNo, message: message });
});

router.post('/KnowManageAdd', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var articleTitle = req.body['articleTitle'];  //取得輸入的類型
    var articleDate = req.body['articleDate'];
    var articleContent = req.body['articleContent'];

    pool.query('insert into articlenews set ?', [{  //新增資料
        ArticleTitle: articleTitle,
        ArticleDate: articleDate,
        ArticleCont: articleContent,

    }], function (err, results) {
        if (err) throw err;
        res.redirect('/BakeKnowManage/KnowManageList');
    });
});


// 毛孩知識刪除 

var id = 0;

router.get('/KnowManageDel', function (req, res, next) {
    id = req.query.id;  //取得傳送的資料id
    var pageNo = parseInt(req.query.pageNo);
    pool.query('select * from articlenews where ArticleId=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;
        res.render('KnowManageDel', { data: results, pageNo: pageNo });
    });
});

router.post('/KnowManageDel', function (req, res, next) {
    pool.query('delete from articlenews where ArticleId=?', [id], function (err, results) {  //刪除資料
        if (err) throw err;
        res.redirect('/BakeKnowManage/KnowManageList');
    });
});


// 毛孩知識編輯

var id = 0;
 
router.get('/KnowManageEdit', function(req, res, next) {
  var categories = ['標題', '發布日期', '內容', '狀態'];
  id = req.query.id;  //取得傳送的資料id
  var pageNo = parseInt(req.query.pageNo);

  pool.query('select * from articlenews where ArticleId=?', [id], function(err, results) {  //根據id讀取資料
    if(err) throw err;
    res.render('KnowManageEdit', { data:results, pageNo:pageNo, categories:categories});
  });
});

router.post('/KnowManageEdit', function(req, res, next) {
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
      res.redirect('/BakeKnowManage/KnowManageList');  //回到原來頁數的管理頁面
  });
});



module.exports = router;