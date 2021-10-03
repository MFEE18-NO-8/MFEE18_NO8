var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js') //含入資料庫連線
// 加密
const crypto = require('crypto');

router.get('/', function (req, res, next) {
    var messages = ""
    var alert = ""

    pool.query('SELECT * from `member` WHERE `Email`=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        if (err) throw err;
        res.render('UserEditPswd', {
            memberData: memberData || "",
            messages: messages,
            alert: alert,
        });
    });
});


router.post('/', function (req, res, next) {

    pool.query('SELECT * from `member` WHERE `Email`=?', [req.session.Email], function (err, results) {
        var memberData = results[0]; // 撈取是否有登入session
        var pageNo = parseInt(req.query.pageNo);
        var oldPswd = req.body['oldPswd'];  //取得輸入的類型
        var newPswd = req.body['newPswd'];
        var newPswdConfirm = req.body['newPswdConfirm'];

        // 加密
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(oldPswd);
        const oldPassword = hashPassword.digest('hex');

        var alert = ""

        // 資料庫密碼 != 輸入密碼
        if (memberData.Password != oldPassword && memberData.Password != oldPswd) {
            messages = "舊密碼不正確"
            res.render('UserEditPswd', {
                messages: messages,
                memberData: memberData || "",
                alert: true,
            })
            return;
            // 輸入的新密碼 != 輸入的確認密碼
        } else if (newPswd !== newPswdConfirm) {
            messages = "新密碼不一致，請重新輸入"
            res.render('UserEditPswd', {
                memberData: memberData || "",
                alert: true,
                messages: messages,
            })
            return;
            // 資料庫密碼 = 輸入的新密碼
        } else if (memberData.Password == newPswd) {
            messages = "輸入的新舊密碼一致，請重新輸入"
            res.render('UserEditPswd', {
                memberData: memberData || "",
                alert: true,
                messages: messages,
            })
            return;
        }

        // 新密碼加密
        let hashPassword2 = crypto.createHash('sha1');
        hashPassword2.update(newPswd);
        const newPassword = hashPassword2.digest('hex');

        ;//錯誤訊息
        pool.query('update member set ? where Email=?', [{  //更新資料
            Password: newPassword,
        }, req.session.Email], function (err, results) {
            if (err) throw err;
            var messages = ""
            messages = "密碼更新成功"
            res.render('UserEditPswd', {
                messages: messages,
                alert: false,
                memberData: memberData || "",
            });
        });
    });
});
module.exports = router;