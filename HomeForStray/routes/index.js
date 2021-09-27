var express = require('express');
var router = express.Router();
var mysql = require('mysql');  //含入mysql套件
var pool = require('./lib/db.js');  //含入資料庫連線



/* GET home page. */
router.get('/', function (req, res, next) {


  pool.query('select * from News order by ShowStartDate desc; select * from Member where Email=?',[req.session.Email], function (err, results) {
    if (err) throw err;
    // console.log(results[0])
    console.log(results[1])
    res.render('index', { data: results[0] ,
                          memberData: results[1] || ""});
  });

});

module.exports = router;