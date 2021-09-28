var express = require('express');
var router = express.Router();
var mysql = require('mysql');        //含入mysql套件
var pool = require('./lib/db.js');   //含入資料庫連線



// 最新消息後台清單
var linePerPage = 10;  // 每頁資料筆數

router.get('/NewsManageList', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
    if (isNaN(pageNo) || pageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        pageNo = 1;
    }

    pool.query('select count(*) as cnt from News', function (err, results) {  //讀取資料總筆數
        if (err) throw err;
        var totalLine = results[0].cnt;  //資料總筆數
        var totalPage = Math.ceil(totalLine / linePerPage);  //總頁數

        pool.query('select * from News order by NewsId desc limit ?, ?', [(pageNo - 1) * linePerPage, linePerPage], function (err, results) {  //根據目前頁數讀取資料
            if (err) throw err;
            res.render('NewsManageList', { data: results, pageNo: pageNo, totalLine: totalLine, totalPage: totalPage, linePerPage: linePerPage });
        });
    });
});


// 最新消息後台新增
var message = '';

router.get('/NewsManageAdd', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    res.render('NewsManageAdd', { pageNo: pageNo, message: message });
});

router.post('/NewsManageAdd', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var NewsTitle = req.body['NewsTitle'];  //取得輸入的類型
    var ShowStartDate = req.body['ShowStartDate'];
    var ShowEndDate = req.body['ShowEndDate'];
    var NewsState = req.body['NewsState'];
    var NewsContent = req.body['NewsContent'];
    var NewsFileName = req.body['NewsFileName'];


    pool.query('insert into News set ?', [{  //新增資料
        NewsTitle: NewsTitle,
        ShowStartDate: ShowStartDate,
        ShowEndDate: ShowEndDate,
        ModifyDate: new Date(),
        NewsState: NewsState,
        NewsContent: NewsContent,
    }]
        // , pool.query('insert into NewsFileName set ?', [{  //新增資料
        //     NewsFileName: NewsFileName,
        // }]
        , function (err, results) {
            if (err) throw err;
            res.redirect('/BackNewsManage/NewsManageList');
        });
});


// 最新消息刪除

var id = 0;

router.get('/NewsManageDel', function (req, res, next) {
    id = req.query.id;  //取得傳送的資料id
    var pageNo = parseInt(req.query.pageNo);
    pool.query('select * from News where NewsId=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;
        res.render('NewsManageDel', { data: results, pageNo: pageNo });
    });
});

router.post('/NewsManageDel', function (req, res, next) {
    pool.query('delete from News where NewsId=?', [id], function (err, results) {  //刪除資料
        if (err) throw err;
        res.redirect('/BackNewsManage/NewsManageList');
    });
});


// 最新消息編輯

var message = '';
var id = 0;

router.get('/NewsManageEdit', function (req, res, next) {
    id = req.query.id;  //取得傳送的資料id
    var categories = ['公告', '更新', '活動', '其他'];
    var pageNo = parseInt(req.query.pageNo);
    pool.query('select * from News where NewsId=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;

        res.render('NewsManageEdit', { data: results, pageNo: pageNo, categories: categories });
    });
});
router.post('/NewsManageEdit', function (req, res, next) {
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
        res.redirect('/BackNewsManage/NewsManageList?pageNo=' + pageNo);  //回到原來頁數的管理頁面    });
    });
});



module.exports = router;