var express =require('express');
var router =express.Router();
// 使用資料庫
var mysql =require('mysql'); //引用mysql套件
var pool =require('./lib/db.js') //含入資料庫連線
//設定網頁，每頁資料筆數。通知每頁5筆應該差不多
var LinePerPage = 5;

router.get('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
    if (isNaN(pageNo) || pageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        pageNo = 1;
    }
    //對資料庫進行存取
    //從"使用者通知"那資料庫裏，抓資料(總筆數)，如果資料庫操作命令執行結果有傳回值，傳回值會儲存於「results」參數中。
    pool.query('select count(*) as cnt from UserMsg', function(err, results) { 
        if(err) throw err;
        var TotalLine = results[0].cnt;  //資料總筆數
        var TotalPage = Math.ceil(TotalLine / LinePerPage);  //資料總頁數＝總筆數/每頁顯示數
        pool.query('select * from UserMsg order by MsgID desc limit ?, ?', 
            [(pageNo - 1) * LinePerPage, LinePerPage],//根據目前頁數讀取資料
            function (err, results) {  
            if (err) throw err;
            res.render('UserMsg',{ data: results, pageNo: pageNo, TotalLine: TotalLine, TotalPage: TotalPage, LinePerPage: LinePerPage});
        });
        //從UserMsg讀取資料 並依照MsgID做反 向排序(最新的排最上方)，由(pageNo-1)＊5開始取得 5 筆資料記錄
        // pool.query('SELECT * FROM UserMsg JOIN register ON(register.MemberID=UserMsg.MemberID) WHERE UserMsg.MemberID=?,?', 
            // [req.body.MemberId,req.body.MemberId],
            // function (err, results) {  
            // if (err) throw err;
            // 將取得的資料記錄以「data,pageNo,TotaLine,TotalPage,LinePerPage」等參數傳送給 <UserMsg.ejs> 模版
            // res.render('UserMsg', { data: results, pageNo: pageNo, TotalLine: TotalLine, TotalPage: TotalPage, LinePerPage: LinePerPage });
        // });
    });
});

router.post('/login', function(req, res, next) {
    var Email = req.body.Email;
    var Password = req.body.Password;
    db.query("select * from member where Email=?",[Email],function(err,results){
        console.log(results.length)
        if(err) throw err;
        if(resules.length == 0){
            messages = "帳號不正確"
        }else if (results[0].Password != Password){
            messages = "密碼不正確"
        }else {
            req.session.Email = req.body.Emai;
        }
    });
});


module.exports = router;


// 下面筆記
// node.js 的 mysql 套件提供 SQL 命令使用參數功能：可用「?」做為參數，再將參數值置於中括號中即可，語法為：
// pool.query(含問號的資料庫操作命令, [參數值一, 參數值二,……]
    // pool.query('select * from newscenter where news_type=     "公告"'
    // 例如上面 SQL 命令可改寫為：
    // pool.query('select * from newscenter where news_type=   ?', ["公告"]

// 參數值也可超過一個，參數值以逗點「,」分隔，例如由第 5 筆資料開始取得 3 筆資料記錄 (即第 5、6、7 筆資料記錄)：
// pool.query('select * from newscenter limit ?, ?', [4,3] 

// router.post/router.get/router.put/router.delete
// 增/查/修/刪


// 以下測試失敗

// 以下測試成功
// SELECT * FROM UserMsg JOIN register ON(register.MemberID=UserMsg.MemberID) WHERE UserMsg.MemberID=1
// SELECT * FROM UserMsg,register WHERE register.MemberID=UserMsg.MemberID AND UserMsg.MemberID=1