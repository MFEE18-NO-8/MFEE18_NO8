var express =require('express');
var router =express.Router();
var mysql =require('mysql'); //含入mysql套件
var pool=require('./lib/db.js') //含入資料庫連線
//設定網頁 每頁資料筆數
var LinePerPage = 5;

router.get('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
    if (isNaN(pageNo) || pageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        pageNo = 1;
    }
    //對資料庫進行存取
    //從"使用者追蹤"那資料庫裏，抓資料(總筆數)，如果資料庫操作命令執行結果有傳回值，傳回值會儲存於「results」參數中。
    pool.query('select count(*) as cnt from UserFollow', 
        function(err, results) { 
        if(err) throw err;
        var TotalLine = results[0].cnt;  //資料總筆數 假設100筆
        var TotalPage = Math.ceil(TotalLine / LinePerPage);  //資料總頁數＝總筆數/每頁顯示數  10頁 每頁10筆

        pool.query('SELECT * FROM UserFollow JOIN register ON(register.MemberID=UserFollow.MemberID)JOIN PostForAdopt ON(register.MemberID=PostForAdopt.MemberID) WHERE UserFollow.UserFollowState=1', 
            [(pageNo - 1) * LinePerPage, LinePerPage], 
            function (err, results) {  //根據目前頁數讀取資料
                if (err) throw err;
                // 將取得的資料記錄以「data,pageNo,TotaLine,TotalPage,LinePerPage」等參數傳送給 <UserFollow.ejs> 模版
                res.render('UserFollow', 
                {   data: results, 
                    pageNo: pageNo, 
                    TotalLine: TotalLine, 
                    TotalPage: TotalPage, 
                    LinePerPage: LinePerPage 
                });
            });
    });
   
});

module.exports = router;