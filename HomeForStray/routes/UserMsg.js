var express =require('express');
var router =express.Router();
// 使用資料庫
var mysql =require('mysql'); //含入mysql套件
var pool=require('./lib/db.js') //含入資料庫連線
//設定網頁 每頁資料筆數
var LinePerPage = 5;

router.get('/', function (req, res, next) {
    var PageNo = parseInt(req.query.PageNo);  //取得傳送的目前頁數
    if (isNaN(PageNo) || PageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
        PageNo = 1;
    }
    //對資料庫進行存取
    //從"使用者通知"那資料庫裏，抓資料(總筆數)，如果資料庫操作命令執行結果有傳回值，傳回值會儲存於「results」參數中。


        pool.query('SELECT * FROM UserMsg JOIN member ON(member.MemberID=UserMsg.MemberID) where Email=?',[req.session.Email], function (err, results) {
            var memberData = results; // 撈取是否有登入session
            console.log(memberData)

            var TotalLine = memberData.length;  // 資料總筆數 會員1只有兩筆
            var TotalPage = Math.ceil(TotalLine / LinePerPage);  //資料總頁數＝總筆數/每頁顯示數
            pool.query('SELECT * from UserMsg order by MsgID DESC limit ?, ?',
            [(PageNo - 1) * LinePerPage, LinePerPage],
            // pool.query('SELECT * FROM UserMsg JOIN member ON(member.MemberID=UserMsg.MemberID) where Email= ? order by MsgID desc limit ?, ?',
            // [req.session.Email,(PageNo - 1) * LinePerPage, LinePerPage],
             function (err, results) {  //根據目前頁數讀取資料
               if (err) throw err;
               res.render('UserMsg', { 
                   data: results, //全部筆數
                   memberData: memberData || "", 
                   PageNo: PageNo, 
                   TotalLine: TotalLine, 
                   TotalPage: TotalPage, 
                   LinePerPage: LinePerPage });

        });
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
// 以下測試失敗

// 以下測試成功
// SELECT * FROM UserMsg JOIN register ON(register.MemberID=UserMsg.MemberID) WHERE UserMsg.MemberID=1
// SELECT * FROM UserMsg,register WHERE register.MemberID=UserMsg.MemberID AND UserMsg.MemberID=1