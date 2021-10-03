var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var message = '';

router.get('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    res.render('KnowManageAdd', { pageNo: pageNo, message: message });
});

router.post('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var articleTitle = req.body['articleTitle'];  //取得輸入的類型
    var articleDate = req.body['articleDate'];
    var displayStatus = req.body['displayStatus'];
    var articleContent = req.body['articleContent'];

    pool.query('insert into articlenews set ?', [{  //新增資料
        ArticleTitle: articleTitle,
        ArticleDate: articleDate,
        ArticleStatus: displayStatus,
        ArticleCont: articleContent,

    }], function (err, results) {
        if (err) throw err;
        res.redirect('/KnowManageList');
    });
});

module.exports = router;