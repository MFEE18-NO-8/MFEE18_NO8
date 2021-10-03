var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線


router.get('/', function (req, res, next) {
    pool.query('select * from postforadopt order by PetId', function (err, results) {
        if (err) throw err;
        res.render('FosterManageEdit', { data: results });

    })




    // UserId: '01!',
    // FosterDate: '2021-09-01!',
    // WhatPet: '大狗!',
    // WhatPetType: '米克斯!',
    // PetSize: '大型!',
    // PetColor: '七彩!',
    // PetAge: '老年!',
    // PetGener: '母!',
    // Ligation: '已結紮!',
    // PetChip: '有晶片!',
    // PetWhere: '台中市!',
    // UserName: '李旻育先生!',
    // UserPhone: '0986-073-100!',
    // PetPersonality: '害羞怕生!',
    // AdoptionStatus: '開放領養!',
    // PublicationStatus: '已批准!'
});



module.exports = router;