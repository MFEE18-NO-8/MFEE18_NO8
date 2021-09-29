const { json, application } = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');        //含入mysql套件
var pool = require('./lib/db.js');   //含入資料庫連線


// 刊登審核後台清單
router.get('/FosterManageList', function (req, res) {  //網頁剛進入 走GET路由 "為了顯示空的頁面"

    res.render('FosterManageList', { data: [] }); // 給data空陣列才不會把讀不到length屬性導致壞掉

});

router.post('/FosterManageList', function (req, res) {  // app.js 已掛好路徑 post & get 會成對 >>

    // 1. 取出傳入的參數 
    // 下方程式為第一步驟內容 
    // [req.body.PetName, req.body.FosterDateStart, req.body.FosterDateEnd, req.body.AdoptState]

    // console.log
    // (
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

// 刊登審核後台新增
router.get('/FosterManageAdd', function (req, res) {  //網頁剛進入 走GET路由 "為了顯示空的頁面"

    res.render('FosterManageAdd');

});

router.post('/FosterManageAdd', function (req, res) {

    pool.query('INSERT INTO `postforadopt` ' + //js語法 >> "單引號" 加 "+"" 換行再用 "單引號" << 可縮排程式碼 原理:字串+字串  '12' = '1''2' = '1' + '2'
        ' (`PetName`,`MemberId`,`AdoptDate`,`PetSpecies`,`PetBreed`,`BodyType`,`PetFur`,`PetAge`,`PetGender`,`Neuter`,`Microchip`,`CityId`,`ContactPerson`,`ContactPhone`,`PetDes`,`AdoptState`) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)',

        [  // 新增資料
            req.body.PetName,
            req.body.MemberId,
            req.body.AdoptDate,
            req.body.PetSpecies,
            req.body.PetBreed,
            req.body.BodyType,
            req.body.PetFur,
            req.body.PetAge,
            req.body.PetGender,
            req.body.Neuter,
            req.body.Microchip,
            req.body.CityId,
            req.body.ContactPerson,
            req.body.ContactPhone,
            req.body.PetDes,
            req.body.AdoptState,
        ],

        function (err, results) {

            // console.log(results);

            if (err) throw err;

            res.redirect('/BackFosterManage/FosterManageList');
        });


})




// 刊登審核後台編輯

router.get('/ForsterManageEdit', function (req, res) {
    var PetId = 0;
    PetId = req.query.PetId;  //取得傳送的資料id
    // var PetId = parseInt(req.query.PetId);
    pool.query('select * from postforadopt where PetId=?',
        [
            PetId
        ],

        function (err, results) {  //根據PetId讀取資料

            if (err) throw err;
            res.render('FosterManageEdit', { data: results, PetId: PetId });
        });
});

router.post('/ForsterManageEdit', function (req, res) {
    // 1. req取得PetId 

    var PetId = req.body.PetId
    var PetName = req.body.PetName
    var AdoptDate = req.body.AdoptDate
    var PetSpecies = req.body.PetSpecies
    var PetBreed = req.body.PetBreed
    var BodyType = req.body.BodyType
    var PetFur = req.body.PetFur
    var PetAge = req.body.PetAge
    var PetGender = req.body.PetGender
    var Neuter = req.body.Neuter
    var Microchip = req.body.Microchip
    var ContactPerson = req.body.ContactPerson
    var ContactPhone = req.body.ContactPhone
    var PetDes = req.body.PetDes
    // var AdoptSatae = req.body.AdoptSatae

    // 2. 根據PetId將資料 
    pool.query('UPDATE `postforadopt` SET ? WHERE PetId=? ',
        [{
            PetName,
            AdoptDate,
            PetSpecies,
            PetBreed,
            BodyType,
            PetFur,
            PetAge,
            PetGender,
            Neuter,
            Microchip,
            ContactPerson,
            ContactPhone,
            PetDes,
            // AdoptSatae,
        }, PetId],
        function (err, results) {  //料
            if (err) throw err;

            // 3. 跳轉到List
            res.redirect('/BackFosterManage/FosterManageList');
        });
});


// 刊登審核後台刪除
router.get('/ForsterManageDel', function (req, res) {
    var PetId = 0;
    PetId = req.query.PetId;  //取得傳送的資料id
    // var PetId = parseInt(req.query.PetId);
    pool.query('select * from postforadopt where PetId=?',
        [
            PetId
        ],

        function (err, results) {  //根據PetId讀取資料

            if (err) throw err;
            res.render('ForsterManageDel', { data: results, PetId: PetId });
        });
});

router.post('/ForsterManageDel', function (req, res) {
    // 1. req取得PetId 

    var PetId = req.body.PetId

    // 2. 根據PetId將資料抓出來刪除 
    pool.query('DELETE FROM `postforadopt` WHERE `postforadopt`.`PetId` = ?',

        [
            PetId
        ],

        function (err, results) {  //刪除資料
            if (err) throw err;

            // 3. 跳轉到List
            res.redirect('/BackFosterManage/FosterManageList');
        });
});


module.exports = router;