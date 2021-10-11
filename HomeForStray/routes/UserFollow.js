var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線
var LinePerPage = 5;//設定網頁 每頁資料筆數

router.get('/', function (req, res, next) {
    var PageNo = parseInt(req.query.PageNo);  //取得傳送的目前頁數
    if (isNaN(PageNo) || PageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        PageNo = 1;
    }
    pool.query('select * from `Member` where `Email`=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        pool.query('SELECT * FROM `UserFollow` JOIN `member` ON(`member`.MemberID=`UserFollow`.`MemberID`) JOIN PostForAdopt ON (`PostForAdopt`.`Petid`=`UserFollow`.`Petid`) WHERE `UserFollowState` = 1 AND `Email`=?', [req.session.Email], function (err, results) {
            var FollowData = results; // 抓取 登入後的資料
            // console.log(FollowData);
            // console.log("[mysql error]", err);
            var TotalLine = FollowData.length; //資料總筆數 
            // console.log(TotalLine);
            var TotalPage = Math.ceil(TotalLine / LinePerPage); //資料總頁數＝總筆數/每頁顯示數 
            // console.log(TotalPage);
                if (err) throw err;
                res.render('UserFollow', {
                    FollowData: FollowData || "",
                    PageNo: PageNo,
                    TotalLine: TotalLine,
                    TotalPage: TotalPage,
                    LinePerPage: LinePerPage,
                    memberData: memberData || "",
                    isGuest: true, // footer 刊登送養 會員專區 判斷是否登入
            });
        });
    });
});

// 更改數值 
//目標  我需要每一個按鈕都有各自的代號 他們每個按鈕按下去 會更新各自的資料庫(條件：寵物編號 使用者編號  當這兩個與數據資料庫相同時 才會進行將資料庫修正)   
//目前遇到的問題：
//1. 每一個按鈕都有各自的代號  =>使用name
//2. 按鈕按下的事件  =>不需要
//3. 不知道怎麼抓單筆資料  
router.post('/', function (req, res, next) {    
    var unfollowbutton = req.body.unfollowbutton
    console.log(unfollowbutton)
    pool.query('UPDATE UserFollow SET UserFollowState= 0 WHERE FollowID =? ' , [unfollowbutton], function (err, results) {
        if (err) throw err;
        console.log('我成功了')
        res.redirect('/UserFollow');
    });
});

module.exports = router;