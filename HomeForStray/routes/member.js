var express = require('express');
var router = express.Router();
const db = require('../models/connection_db');
// 加密
const crypto = require('crypto');


// 註冊
const MemberModifyMethod = require('../controllers/modify_controller');

memberModifyMethod = new MemberModifyMethod();

router.get('/register', function (req, res, next) {
    res.render('Register');
});

router.post('/register', memberModifyMethod.postRegister);


// 登入
var messages ='';  //錯誤訊息
router.get('/login', function (req, res, next) {
    res.render('login', {messages:messages});
});

router.post('/login', function (req, res, next) {
    var Email = req.body.Email;
    var Password = req.body.Password;

    // 加密
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(Password);
    const rePassword = hashPassword.digest('hex');

    db.query("select * from member where Email=?",[Email], function(err, results) {  //根據帳號讀取資料
        console.log(results.length)
        if(err) throw err;
        if(results.length == 0) {  //帳號不存在
          messages = "帳號不正確"
          res.render('login', {messages:messages})
        } else if(results[0].Password != rePassword) {  //密碼不正確
          messages = "密碼不正確"
          res.render('login', {messages:messages})
        } else {  //帳號及密碼皆正確
            req.session.Email = req.body.Email;
            res.redirect('/'); //跳轉首頁
        }
      });
});

// 登出
var messages ='';  //錯誤訊息
router.get('/logout', function (req, res, next) {
    delete req.session.Email;
    res.redirect('/');
});


module.exports = router;