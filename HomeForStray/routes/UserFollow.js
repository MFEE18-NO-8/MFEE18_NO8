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
    pool.query('SELECT * FROM UserFollow JOIN member ON(member.MemberID=UserFollow.MemberID) JOIN PostForAdopt ON (PostForAdopt.Petid=UserFollow.Petid) WHERE UserFollowState = 1 AND Email=？',[req.session.Email], function(err, results){
        var memberData = results; // 撈取是否有登入session
        console.log(memberData)

        var TotalLine = memberData.length; //資料總筆數 朱建輝 有兩筆追蹤資料
        var TotalPage = Math.ceil(TotalLine / LinePerPage); //資料總頁數＝總筆數/每頁顯示數  朱建輝資料總頁數 1 ，因為總共2筆/每頁顯示5筆資料

        pool.query('SELECT * FROM UserFollow ORDER BY FollowDate DESC LIMIT ?,?',[(PageNo - 1) * LinePerPage, LinePerPage],
        function(err,results){
            if (err) throw err;
            res.render('UserFollow', { 
                data: results, 
                memberData: memberData || "", 
                PageNo: PageNo, 
                TotalLine: TotalLine, 
                TotalPage: TotalPage, 
                LinePerPage: LinePerPage });
        });
        
    });
});

module.exports = router;