var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var mysql = require('mysql');
var db_option = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'HomeForStray',
    port: 3306
};


regist_post(req, res) ;
  var f = new formidable.IncomingForm();
  f.parse(req, (err, fileds) => {
      db.where(fileds.User, fileds.Password).select_user(function (data) {
          if (fileds.User == '') {
              var backstr = "<script>alert('註冊賬號不能為空');window.location.href='/'</script>"
              res.setHeader('Content-type', 'text/html;charset=utf-8');
              res.end(backstr);
          } else if (fileds.Password == '') {
              var backstr = "<script>alert('註冊密碼不能為空');window.location.href='/'</script>"
              res.setHeader('Content-type', 'text/html;charset=utf-8');
              res.end(backstr);
          } else {
              if (data == '') {
                  db.where(fileds.User, fileds.Password).add();
                  var backstr = "<script>alert('註冊成功');window.location.href='/'</script>"
                  res.setHeader('Content-type', 'text/html;charset=utf-8');
                  res.end(backstr);
              }else{
                  var backstr = "<script>alert('賬號已存在');window.location.href='/'</script>"
                  res.setHeader('Content-type', 'text/html;charset=utf-8');
                  res.end(backstr);
              }
          }
      })
  })

  var pageNo = parseInt(req.query.pageNo);
  var AccountNumber = req.body['AccountNumbere'];  //取得輸入的類型
  var Password = req.body['Password'];
  var Name = req.body['Name'];
  var CellPhone = req.body['CellPhone'];
  var Email = req.body['Email']
  var DateOfBirth = req.body['DateOfBirth']



  pool.query('INSERT INTO `postforadopt` ' + //js語法 >> "單引號" 加 "+"" 換行再用 "單引號" << 可縮排程式碼 原理:字串+字串  '12' = '1''2' = '1' + '2'

  ' (`AccountNumber`,`Password`,`Name`,`Cellphone`,`Email`,`DateOfBirth`) VALUES (? , ? , ? , ? , ? , ? )',

    // 新增資料
      req.body.AccountNumber,
      req.body.Password,
      req.body.Name,
      req.body.Email,
      req.body.DateOfBirth,
      

  function (err, results) {

      // console.log(results);

      if (err) throw err;

      res.redirect('/Register');
  })