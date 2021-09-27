var express =require('express');
var router =express.Router();
var mysql =require('mysql'); //含入mysql套件
var pool=require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res, next) {
    //對資料庫進行存取
    pool.query('SELECT * FROM UserFollow JOIN register ON(register.MemberID=UserFollow.MemberID)JOIN PostForAdopt ON(register.MemberID=PostForAdopt.MemberID) WHERE UserFollow.UserFollowState=1', [],function (err, results) {  //根據目前頁數讀取資料
        if (err) throw err;
        console.log(data[0])
        res.render('UserFollow', 
        {   
            data: results[0],
            data1: results[1],
        });
    });
});

module.exports = router;