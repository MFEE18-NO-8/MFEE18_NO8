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
    pool.query('select * from member where MemberID=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;
        res.render('UserManageEdit', { data: results, pageNo: pageNo, categories: categories });
    });
});
router.post('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var memberState = req.body['memberState']; //取得輸入的類型
    pool.query('update Member set ? where MemberId=?', [{  //更新資料
        ModifiedDate: new Date(),
        memberState: memberState,

    }, id], function (err, results) {
        if (err) throw err;
        res.redirect('/UserManageList?pageNo=' + pageNo);  //回到原來頁數的管理頁面    });
    });
});
module.exports = router;