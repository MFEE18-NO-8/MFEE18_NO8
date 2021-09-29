const { json, application } = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線



router.get('/', function (req, res) {           //網頁剛進入 走GET路由 "為了顯示空的頁面"


    pool.query(" select  count(*) as cnt  from postforadopt WHERE (PetName=? OR ?='') AND (AdoptDate>=? OR ?='' ) AND (AdoptDate<=? OR ?='' ) AND (AdoptState=? OR ?='') ",
        [
            req.query.PetName,
            req.query.PetName,
            req.query.FosterDateStart,
            req.query.FosterDateStart,
            req.query.FosterDateEnd,
            req.query.FosterDateEnd,
            req.query.AdoptState,
            req.query.AdoptState
        ],

        function (err, results) {  //讀取資料總筆數
            if (err) throw err;
            var LinePage = 3;
            var TotalLine = results[0].cnt;  //資料總筆數
            var TotalPage = Math.ceil(TotalLine / LinePage);  //總頁數 補充: Math.ceil 讓多一筆資料直接變成新一頁放置其中
            var PageNum = parseInt(req.query.PageNum);  //取得傳送的目前頁數 (字串轉成整數如果第一個字串無法被解析為任何數字，parseInt 會回傳 NaN)
            if (isNaN(PageNum) || PageNum < 1)          //如果沒有傳送參數,設目前頁數為第1頁 || 是 or 的意思
            {
                PageNum = 1;
            }

            pool.query(" select * from postforadopt WHERE (PetName=? OR ?='') AND (AdoptDate>=? OR ?='' ) AND (AdoptDate<=? OR ?='' ) AND (AdoptState=? OR ?='' ) order by PetId  limit ?, ? ", // 選此資料表 用PetId排序
                [
                    req.query.PetName,
                    req.query.PetName,
                    req.query.FosterDateStart,
                    req.query.FosterDateStart,
                    req.query.FosterDateEnd,
                    req.query.FosterDateEnd,
                    req.query.AdoptState,
                    req.query.AdoptState,

                    (PageNum - 1) * LinePage,
                    LinePage
                ],

                function (err, results) {  //根據目前頁數讀取資料  )
                    console.log(results);
                    if (err) throw err;
                    res.render('FosterManageList',  //丟到 ejs 模板上
                        {
                            data: results,
                            PageNum: PageNum,
                            req: req

                            // TotalLine: TotalLine,
                            // TotalPage: TotalPage,
                            // LinePage: LinePage
                        });


                    // res.render('FosterManageList', { data: [] }); // 給data空陣列才不會把讀不到length屬性導致壞掉

                });

        }
    );

});







// router.post('/', function (req, res) {  // app.js 已掛好路徑 post & get 會成對 >>

//     pool.query(" select  count(*) as cnt  from postforadopt WHERE (PetName=? OR ?='') AND (AdoptDate>=? OR ?='' ) AND (AdoptDate<=? OR ?='' ) AND (AdoptState=? OR ?='') ",

//         [
//             req.body.PetName,
//             req.body.PetName,
//             req.body.FosterDateStart,
//             req.body.FosterDateStart,
//             req.body.FosterDateEnd,
//             req.body.FosterDateEnd,
//             req.body.AdoptState,
//             req.body.AdoptState
//         ],

//         function (err, results) {  //讀取資料總筆數
//             if (err) throw err;
//             // console.log(results[0].cnt);
//             var LinePage = 3;
//             var TotalLine = results[0].cnt;  //資料總筆數
//             var TotalPage = Math.ceil(TotalLine / LinePage);  //總頁數 補充: Math.ceil 讓多一筆資料直接變成新一頁放置其中
//             var PageNum = parseInt(req.query.PageNum);  //取得傳送的目前頁數 (字串轉成整數如果第一個字串無法被解析為任何數字，parseInt 會回傳 NaN)
//             if (isNaN(PageNum) || PageNum < 1)          //如果沒有傳送參數,設目前頁數為第1頁 || 是 or 的意思
//             {
//                 PageNum = 1;
//             }

//             pool.query(" select * from postforadopt WHERE (PetName=? OR ?='') AND (AdoptDate>=? OR ?='' ) AND (AdoptDate<=? OR ?='' ) AND (AdoptState=? OR ?='' ) order by PetId  limit ?, ? ", // 選此資料表 用PetId排序
//                 [
//                     req.body.PetName,
//                     req.body.PetName,
//                     req.body.FosterDateStart,
//                     req.body.FosterDateStart,
//                     req.body.FosterDateEnd,
//                     req.body.FosterDateEnd,
//                     req.body.AdoptState,
//                     req.body.AdoptState,

//                     (PageNum - 1) * LinePage,
//                     LinePage
//                 ],

//                 function (err, results) {  //根據目前頁數讀取資料  )
//                     if (err) throw err;
//                     // console.log(PageNum);
//                     res.render('FosterManageList',  //丟到 ejs 模板上
//                         {
//                             data: results,
//                             PageNum: PageNum,
//                             // TotalLine: TotalLine,
//                             // TotalPage: TotalPage,
//                             // LinePage: LinePage
//                         });


//                     // res.render('FosterManageList', { data: [] }); // 給data空陣列才不會把讀不到length屬性導致壞掉

//                 });

//         }
//     );

// });


module.exports = router;