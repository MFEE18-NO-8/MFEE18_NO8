var express =require('express');
var router =express.Router();
var mysql =require('mysql'); //含入mysql套件
var pool=require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res, next) {
    pool.query('SELECT * from `member` WHERE `Email`=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        pool.query('SELECT * FROM `member` WHERE `Email`=?',[req.session.Email], function (err, results){
            var UserData =results;
            console.log(UserData)
            if (err) throw err;
            res.render('UserEdit', { 
                UserData: UserData || "", 
                memberData: memberData || "",
            });
        })
        
    });
});

module.exports = router;