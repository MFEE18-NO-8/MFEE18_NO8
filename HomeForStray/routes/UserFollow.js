var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線
//設定網頁 每頁資料筆數
var LinePerPage = 5;

router.get('/', function (req, res, next) {
    var PageNo = parseInt(req.query.PageNo);  //取得傳送的目前頁數
    if (isNaN(PageNo) || PageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        PageNo = 1;
    }
    pool.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        pool.query('SELECT * FROM UserFollow JOIN member ON(member.MemberID=UserFollow.MemberID) JOIN PostForAdopt ON (PostForAdopt.Petid=UserFollow.Petid) WHERE UserFollowState = 1 AND Email=?', [req.session.Email], function (err, results) {
            var FollowData = results; // 撈取是否有登入session
            console.log(FollowData)

            var TotalLine = FollowData.length; //資料總筆數 朱建輝 有兩筆追蹤資料
            var TotalPage = Math.ceil(TotalLine / LinePerPage); //資料總頁數＝總筆數/每頁顯示數  朱建輝資料總頁數 1 ，因為總共2筆/每頁顯示5筆資料

            pool.query('SELECT * FROM UserFollow ORDER BY FollowDate DESC LIMIT ?,?', [(PageNo - 1) * LinePerPage, LinePerPage],
                function (err, results) {
                    if (err) throw err;
                    res.render('UserFollow', {
                        data: results,
                        FollowData: FollowData || "",
                        PageNo: PageNo,
                        TotalLine: TotalLine,
                        TotalPage: TotalPage,
                        LinePerPage: LinePerPage,
                        memberData: memberData || "",
                    });
                });
        });
    });
});

module.exports = router;