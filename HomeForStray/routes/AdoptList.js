var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res) {
    var CityId = req.query.CityId
    var PetGender = req.query.PetGender
    var PetSpecies = req.query.PetSpecies

    if (CityId === undefined) {
        CityId = ''
    }
    if (PetGender === undefined) {
        PetGender = ''
    }
    if (PetSpecies === undefined) {
        PetSpecies = ''
    }

    pool.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session

        // pool.query(" select  count(*) as cnt  from postforadopt, CityDatas, PetImgDatas WHERE ((PostForAdopt.CityId=CityDatas.CityId)=? OR ?='') AND (PetGender=? OR ?='' ) AND (PetSpecies=? OR ?='') ",
        pool.query(" select  count(*) as cnt  from postforadopt WHERE (CityId=? OR ?='') AND (PetGender=? OR ?='' ) AND (PetSpecies=? OR ?='') ",
            [
                CityId,
                CityId,
                PetGender,
                PetGender,
                PetSpecies,
                PetSpecies
            ],
            function (err, results) {  //讀取資料總筆數
                if (err) throw err;
                var LinePage = 6;
                var TotalLine = results[0].cnt;  //資料總筆數
                var TotalPage = Math.ceil(TotalLine / LinePage);  //總頁數 補充: Math.ceil 讓多一筆資料直接變成新一頁放置其中
                var PageNum = parseInt(req.query.PageNum);  //取得傳送的目前頁數 (字串轉成整數如果第一個字串無法被解析為任何數字，parseInt 會回傳 NaN)
                if (isNaN(PageNum) || PageNum < 1)          //如果沒有傳送參數,設目前頁數為第1頁 || 是 or 的意思
                {
                    PageNum = 1;
                }




                // pool.query(" select * from postforadopt, CityDatas, PetImgDatas WHERE ((PostForAdopt.CityId=CityDatas.CityId)=? OR ?='') AND (PetGender=? OR ?='' ) AND (PetSpecies=? OR ?='') order by  AdoptDate DESC  limit ?, ? ", // 選此資料表 用PetId排序
                pool.query(" select * from postforadopt INNER JOIN CityDatas ON PostForAdopt.CityId = CityDatas.CityId INNER JOIN PetImgDatas ON PostForAdopt.PetId = PetImgDatas.PetId WHERE (PostForAdopt.CityId=? OR ?='') AND (PetGender=? OR ?='' ) AND (PetSpecies=? OR ?='') order by  AdoptDate DESC  limit ?, ? ", // 選此資料表 用PetId排序
                    [
                        CityId,
                        CityId,
                        PetGender,
                        PetGender,
                        PetSpecies,
                        PetSpecies,

                        (PageNum - 1) * LinePage,
                        LinePage
                    ],
                    function (err, results) {  //根據目前頁數讀取資料  )
                        if (err) throw err;
                        res.render('AdoptList',  //丟到 ejs 模板上
                            {
                                memberData: memberData || "",
                                data: results,
                                PageNum: PageNum,
                                req: req,
                                TotalLine: TotalLine,
                                TotalPage: TotalPage,
                                LinePage: LinePage,
                                isGuest: true, // footer 刊登送養 會員專區 判斷是否登入
                            });
                    });
            })

    });

})







//     var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
//     if (isNaN(pageNo) || pageNo < 1) {  //如果沒有傳送參數,設目前頁數為第1頁
//         pageNo = 1;
//     }
//     pool.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
//         var memberData = results[0]; // 撈取是否有登入session



//         pool.query('select count(*) as cnt from PostForAdopt', function (err, results) {  //讀取資料總筆數
//             if (err) throw err;
//             var totalLine = results[0].cnt;  //資料總筆數
//             var totalPage = Math.ceil(totalLine / linePerPage);  //總頁數

//             pool.query('select * from PostForAdopt,CityDatas,PetImgDatas where  PostForAdopt.CityId=CityDatas.CityId and PostForAdopt.PetId=PetImgDatas.PetId and PostForAdopt.PetImgId=PetImgDatas.PetImgId order by PostForAdopt.PetId asc limit ?, ?', [(pageNo - 1) * linePerPage, linePerPage], function (err, results) {  //根據目前頁數讀取資料
//                 if (err) throw err;
//                 res.render('AdoptList', 
//                 {   data: results, 
//                     memberData: memberData || "",
//                     pageNo: pageNo, 
//                     totalLine: totalLine, 
//                     totalPage: totalPage, 
//                     linePerPage: linePerPage });
//             });
//         });
//     });
// });

// router.post('/', function (req, res) {  // app.js 已掛好路徑 post & get 會成對 >>
//     // 1. 取出傳入的參數 

//     // 2. 把參數丟到資料庫查詢
//     pool.query("select * from PostForAdopt,CityDatas,PetImgDatas where (CityName=? OR ?='') AND (PetGender=? OR ?='' ) AND (PetSpecies=? OR ?='' )",
//         // MySQL 能單個欄位查詢

//         [
//             req.body.CityName,
//             req.body.CityName,
//             req.body.PetGender,
//             req.body.PetGender,
//             req.body.PetSpecies,
//             req.body.PetSpecies,
//         ],

//         function (err, results) {
//             if (err) throw err;


//             // 3. 把查詢結果作為參數傳給render
//             res.render('AdoptList', { data: results, });

//         })

//     // res.render('FosterManageList', { PetName: req.body.PetName }); // req.params找網址 req.query 找?後面參數 req.body 表單

// });


module.exports = router;