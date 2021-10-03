var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var message = '';

router.get('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    res.render('NewsManageAdd', { pageNo: pageNo, message: message });
});

router.post('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var NewsTitle = req.body['NewsTitle'];  //取得輸入的類型
    var ShowStartDate = req.body['ShowStartDate'];
    var ShowEndDate = req.body['ShowEndDate'];
    var NewsState = req.body['NewsState'];
    var NewsContent = req.body['NewsContent'];


    pool.query('insert into News set ?', [{  //新增資料
        NewsTitle: NewsTitle,
        ShowStartDate: ShowStartDate,
        ShowEndDate: ShowEndDate,
        ModifyDate: new Date(),
        NewsState: NewsState,
        NewsContent: NewsContent,
    }], function (err, results) {
        if (err) throw err;
        res.redirect('/NewsManageList');
    });
});

module.exports = router;