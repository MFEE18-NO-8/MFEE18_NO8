var express =require('express');
var router =express.Router();
var mysql =require('mysql'); //含入mysql套件
var pool=require('./lib/db.js') //含入資料庫連線

router.get('/', function (req, res, next) {

    pool.query('select * from PostForAdopt order by PetId desc',function(err,results){
        if(err) throw err;
        res.render('AdopList', {Pet:results});
    })


});

module.exports = router;