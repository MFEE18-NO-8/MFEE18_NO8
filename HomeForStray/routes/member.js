var express = require('express');
var router = express.Router();
const db = require('../models/connection_db');
// 加密
const crypto = require('crypto');


// 註冊
const MemberModifyMethod = require('../controllers/modify_controller');

memberModifyMethod = new MemberModifyMethod();

router.get('/register', function (req, res, next) {
  db.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
    var memberData = results[0]; // 撈取是否有登入session

    res.render('register', {
      memberData: memberData || "",
      isLogin: false,
      notRegister : false,
      err : "",
    });
  });
});

router.post('/register', memberModifyMethod.postRegister);


// 登入

router.get('/login', function (req, res, next) {
  db.query('select * from Member where Email=?', [req.session.Email], function (err, results) {
    var memberData = results[0]; // 撈取是否有登入session
    res.render('login',
      {
        messages: '',
        memberData: memberData || "",
        notLogin: false,
      });
  });
});

var messages = ""; //錯誤訊息
router.post('/login', function (req, res, next) {
  db.query("select * from member where Email=?", [req.session.Email], function (err, results) {
    var memberData = results[0];
    var Email = req.body.Email;
    var Password = req.body.Password;
    // 加密
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(Password);
    const rePassword = hashPassword.digest('hex');

    db.query("select * from member where Email=?", [Email], function (err, results) {  //根據帳號讀取資料
      if (err) throw err;
      console.log(results)
      if (results.length == 0) {  //帳號不存在
        messages = "帳號不存在，請先註冊"
        res.render('login', { messages: messages, memberData: memberData || "", notLogin: true,})
      } else if (results[0].Password != rePassword && results[0].Password != req.body.Password) {  //密碼不正確
        messages = "密碼不正確"
        res.render('login', { messages: messages, memberData: memberData || "", notLogin: true, })
      } else {  //帳號及密碼皆正確
        req.session.Email = req.body.Email;
        // 被停權
        if(results[0].memberState == 0){
          messages = "會員停權中，如有問題請聯絡我們"
          res.render('login', { messages: messages, memberData: memberData || "", notLogin: true,})
        }else{
          messages = true,
          res.render('login',{ messages : messages , memberData : memberData || "", notLogin: true,}); //跳轉首頁
        }
      }
    });
  });
});

// 登出
var messages = '';  //錯誤訊息
router.get('/logout', function (req, res, next) {
  delete req.session.Email;
  res.redirect('/');
});


module.exports = router;