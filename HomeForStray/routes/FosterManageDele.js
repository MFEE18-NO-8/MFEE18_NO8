const { json, application } = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線

var id = 0;

router.get('/', function (req, res, next) {
    id = req.query.id;  //取得傳送的資料id
    var pageNo = parseInt(req.query.pageNo);
    pool.query('select * from newscenter where news_id=?', [id], function (err, results) {  //根據id讀取資料
        if (err) throw err;
        res.render('newsdelete', { data: results, pageNo: pageNo });
    });
});

router.post('/', function (req, res, next) {
    pool.query('DELETE FROM `postforadopt` WHERE `postforadopt`.`PetId` = ?',
        PetId,

        function (err, results) {  //刪除資料
            if (err) throw err;
            res.redirect('/adminmain');
        });
});

//刪除資料
// router.post('/', function (req, res) {

//     // DELETE statment
//     let sql = 'DELETE FROM `postforadopt` WHERE `postforadopt`.`PetId` = ?';

//     // delete a row with PetId 
//     pool.query(sql, PetId,

//         function (err, results) {

//             console.log(req.body.PetId)
//             if (err) throw err;
//             console.log(results)

//             // res.redirect('/FosterManageList');

//         });

//     // console.log(req.body.PetId)
// });


module.exports = router;