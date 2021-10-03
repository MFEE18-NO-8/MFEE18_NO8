var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res, next) {
    pool.query('SELECT * from `member` WHERE `Email`=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        pool.query('SELECT * FROM `member` WHERE `Email`=?', [req.session.Email], function (err, results) {
            var UserData = results;
            console.log(UserData)
            if (err) throw err;
            res.render('UserEditPswd', {
                UserData: UserData[0] || "",
                memberData: memberData || "",
            });
        })

    });
});


router.post('/', function (req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var CellPhone = req.body['CellPhone'];  //取得輸入的類型
    var Email = req.body['Email'];

    pool.query('update articlenews set ? where ArticleId=?', [{  //更新資料
        CellPhone: CellPhone,
        Email: Email,
    }, id], function (err, results) {
        if (err) throw err;
        res.render('UserEditPswd', {
           
        });
    });
});

module.exports = router;