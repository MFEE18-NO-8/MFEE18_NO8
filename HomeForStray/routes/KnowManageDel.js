var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var id = 0;

router.get('/', function (req, res, next) {
    id = req.query.id;  //取得傳送的資料id
    var pageNo = parseInt(req.query.pageNo);
    pool.query('select * from articlenews where ArticleId=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;
        res.render('KnowManageDel', { data: results, pageNo: pageNo });
    });
});

router.post('/', function (req, res, next) {
    pool.query('delete from articlenews where ArticleId=?', [id], function (err, results) {  //刪除資料
        if (err) throw err;
        res.redirect('/KnowManageList');
    });
});

module.exports = router;