var express =require('express');
var router =express.Router();
var mysql =require('mysql'); //含入mysql套件
var pool=require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res, next) {
    res.render('UserFoster');
});

module.exports = router;