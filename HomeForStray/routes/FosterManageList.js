const { json, application } = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res) {  //網頁剛進入 走GET路由 "為了顯示空的頁面"

    res.render('FosterManageList', { data: [] }); // 給data空陣列才不會把讀不到length屬性導致壞掉

});

router.post('/', function (req, res) {  // app.js 已掛好路徑 post & get 會成對 >>

    // 1. 取出傳入的參數 
    // 下方程式為第一步驟內容 
    // [req.body.PetName, req.body.FosterDateStart, req.body.FosterDateEnd, req.body.AdoptState]

    // console.log(
    //     [
    //         req.body.PetName,
    //         req.body.PetName,
    //         req.body.FosterDateStart,
    //         req.body.FosterDateStart,
    //         req.body.FosterDateEnd,
    //         req.body.FosterDateEnd,
    //         req.body.AdoptState,
    //         req.body.AdoptState
    //     ]
    // )

    // 2. 把參數丟到資料庫查詢
    pool.query("select * from postforadopt WHERE (PetName=? OR ?='') AND (AdoptDate>=? OR ?='' ) AND (AdoptDate<=? OR ?='' ) AND (AdoptState=? OR ?='' ) ",
        // MySQL 能單個欄位查詢
        [
            req.body.PetName,
            req.body.PetName,
            req.body.FosterDateStart,
            req.body.FosterDateStart,
            req.body.FosterDateEnd,
            req.body.FosterDateEnd,
            req.body.AdoptState,
            req.body.AdoptState
        ],

        function (err, results) {
            if (err) throw err;

            // console.log(results);

            // 3. 把查詢結果作為參數傳給render
            res.render('FosterManageList', { data: results, });

        })

    // res.render('FosterManageList', { PetName: req.body.PetName }); // req.params找網址 req.query 找?後面參數 req.body 表單

    // console.log(req.body.FosterDateStart)
    // console.log(req.body.FosterDateEnd)
});


//刪除資料
router.post('/', function (req, res) {

    // DELETE statment
    let sql = 'DELETE FROM `postforadopt` WHERE `postforadopt`.`PetId` = ?';

    // delete a row with PetId 
    pool.query(sql, PetId,

        function (err, results) {

            onsole.log(req.body.PetId)
            if (err) throw err;
            console.log(results)

            // res.redirect('/FosterManageList');

        });

    // console.log(req.body.PetId)
});


module.exports = router;