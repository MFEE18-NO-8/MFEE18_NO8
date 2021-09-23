var express = require('express');
var router = express.Router();
var mysql = require('mysql');        //含入mysql套件
var pool = require('./lib/db.js');   //含入資料庫連線

var linePerPage = 10;  // 每頁資料筆數

/* GET home page. */
router.get('/', function (req, res, next) {
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


// 
// 查詢1
// 
// router.post('/s', function (req, res) {
//     var NewsTitle = req.body.NewsTitle;
//     var age = req.body.s_age;

//     var sql = "select * from News ";

//     if (NewsTitle) {
//         sql += " where NewsTitle like '%" + NewsTitle + "%' ";
//         //     if (age) {
//         //         sql += " and Age=" + age + " ";
//         //     }
//         // } else {
//         //     if (age) {
//         //         sql += " where Age=" + age + " ";
//         //     }
//     }
//     // sql = sql.replace("and","where");
//     pool.query(sql, function (err, rows) {
//         console.log(rows);
//         if (err) {
//             res.end("查詢失敗：", err)
//         } else {
//             res.render("NewsManageList", { title: 'Express', datas: rows, NewsTitle: NewsTitle, s_age: age });
//         }
//     });
// });
// 
// 查詢2
// 
// router.post('/', function (req, res) {  // app.js 已掛好路徑 post & get 會成對 >>

//     // 1. 取出傳入的參數 
//     // 下方程式為第一步驟內容 
//     // [req.body.PetName, req.body.FosterDateStart, req.body.FosterDateEnd, req.body.AdoptState]

//     // console.log(
//     //     [
//     //         req.body.PetName,
//     //         req.body.PetName,
//     //         req.body.FosterDateStart,
//     //         req.body.FosterDateStart,
//     //         req.body.FosterDateEnd,
//     //         req.body.FosterDateEnd,
//     //         req.body.AdoptState,
//     //         req.body.AdoptState
//     //     ]
//     // )

//     // 2. 把參數丟到資料庫查詢
//     pool.query("select * from News WHERE (NewsTitle=? OR ?='') AND (ShowStartDate>=? OR ?='' ) AND (ShowEndDate<=? OR ?='' ) AND (NewsState=? OR ?='' ) ",
//         // MySQL 能單個欄位查詢
//         [
//             req.body.NewsTitle,
//             req.body.NewsTitle,
//             req.body.ShowStartDate,
//             req.body.ShowStartDate,
//             req.body.ShowEndDate,
//             req.body.ShowEndDate,
//             req.body.NewsState,
//             req.body.NewsState
//         ],

//         function (err, results) {
//             if (err) throw err;

//             // console.log(results);

//             // 3. 把查詢結果作為參數傳給render
//             res.render('NewsManageList', { data: results, });

//         })

//     // res.render('FosterManageList', { PetName: req.body.PetName }); // req.params找網址 req.query 找?後面參數 req.body 表單

//     // console.log(req.body.FosterDateStart)
//     // console.log(req.body.FosterDateEnd)
// });


module.exports = router;





