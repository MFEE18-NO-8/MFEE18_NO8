var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res, next) {
    pool.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        console.log(memberData)
        if (memberData == undefined) {  // 沒登入狀態
            res.redirect('/member/login')
          } else { 
            res.render('Foster',{ memberData: memberData,});
          }
    });
});

router.post('/', function (req, res) {

    pool.query('INSERT INTO `postforadopt` ' + //js語法 >> "單引號" 加 "+"" 換行再用 "單引號" << 可縮排程式碼 原理:字串+字串  '12' = '1''2' = '1' + '2'
        ' (`PetName`,`PetSpecies`,`PetBreed`,`BodyType`,`PetFur`,`PetAge`,`PetGender`,`Neuter`,`Microchip`,`CityId`,`ContactPerson`,`ContactPhone`,`PetDes`) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)',

        [  // 新增資料
            req.body.PetName,       // 寵物名稱
            req.body.PetSpecies,    // 種類
            req.body.PetBreed,      // 品種
            req.body.BodyType,      // 體型
            req.body.PetFur,        // 毛色
            req.body.PetAge,        // 年紀
            req.body.PetGender,     // 性別
            req.body.Neuter,        // 結紮
            req.body.Microchip,     // 晶片
            req.body.CityId,        // 區域
            req.body.ContactPerson, // 聯絡人
            req.body.ContactPhone,  // 聯絡人電話
            req.body.PetDes,        // 個性描述
        ],

        function (err, results) {

            // console.log(results);

            if (err) throw err;

            res.redirect('/Foster');

        });

})

module.exports = router;