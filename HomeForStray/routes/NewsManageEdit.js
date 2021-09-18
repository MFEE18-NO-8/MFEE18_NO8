var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var message = '';
var id = 0;

router.get('/', function (req, res, next) {
    id = req.query.id;  //取得傳送的資料id
    var categories = ['公告', '更新', '活動', '其他'];
    var pageNo = parseInt(req.query.pageNo);
    pool.query('select * from News where NewsId=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;

        res.render('NewsManageEdit', { data: results, pageNo: pageNo, categories: categories });
    });
});
router.post('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var NewsTitle = req.body['NewsTitle'];  //取得輸入的類型
    var ShowStartDate = req.body['ShowStartDate'];
    var ShowEndDate = req.body['ShowEndDate'];
    var NewsState = req.body['NewsState'];
    var NewsContent = req.body['NewsContent'];


    pool.query('update News set ? where NewsId=?', [{  //更新資料
        NewsTitle: NewsTitle,
        ShowStartDate: ShowStartDate,
        ShowEndDate: ShowEndDate,
        ModifyDate: new Date(),
        NewsState: NewsState,
        NewsContent: NewsContent,
    }, id], function (err, results) {
        if (err) throw err;
        res.redirect('/NewsManageList?pageNo=' + pageNo);  //回到原來頁數的管理頁面    });
    });
});
module.exports = router;