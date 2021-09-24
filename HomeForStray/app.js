var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//上述列 含入套件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//上述列 含入controller檔案
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//引入multer
const multer = require('multer');


// 引入 毛孩知識管理清單
var KnowManageList = require('./routes/KnowManageList');
app.use('/KnowManageList', KnowManageList);
// 引入 毛孩知識管理新增
var KnowManageAdd = require('./routes/KnowManageAdd');
app.use('/KnowManageAdd', KnowManageAdd);
// 引入 毛孩知識管理刪除
var KnowManageDel = require('./routes/KnowManageDel');
app.use('/KnowManageDel', KnowManageDel);
// 引入 毛孩知識管理編輯
var KnowManageEdit = require('./routes/KnowManageEdit');
app.use('/KnowManageEdit', KnowManageEdit);
// 引入 毛孩知識清單(前台)
var KnowList = require('./routes/KnowList');
app.use('/KnowList', KnowList);
// 引入 毛孩知識內容(前台)
var KnowConent = require('./routes/KnowConent');
app.use('/KnowConent', KnowConent);



// 引入 最新消息清單(前台)
var NewsList = require('./routes/NewsList');
app.use('/NewsList', NewsList);
// 引入 最新消息清單(前台)
var NewsContent = require('./routes/NewsContent');
app.use('/NewsContent', NewsContent);



// 引入 最新消息管理清單
var NewsManageList = require('./routes/NewsManageList');
app.use('/NewsManageList', NewsManageList);
// 引入 最新消息管理新增
var NewsManageAdd = require('./routes/NewsManageAdd');
app.use('/NewsManageAdd', NewsManageAdd);
// 引入 最新消息管理編輯
var NewsManageEdit = require('./routes/NewsManageEdit');
app.use('/NewsManageEdit', NewsManageEdit);
// 引入 最新消息管理刪除
var NewsManageDel = require('./routes/NewsManageDel');
app.use('/NewsManageDel', NewsManageDel);



//引入 毛孩領養清單
var AdoptList = require('./routes/AdoptList');
app.use('/AdoptList', AdoptList);
//引入 毛孩領養內容
var AdoptContent = require('./routes/AdoptContent');
app.use('/AdoptContent', AdoptContent);



//引入 我的送養文
var UserFoster = require('./routes/UserFoster');
app.use('/UserFoster', UserFoster)
//引入 我追蹤的毛孩
var UserFollow = require('./routes/UserFollow');
app.use('/UserFollow', UserFollow)
//引入 我的通知訊息
var UserMsg = require('./routes/UserMsg');
app.use('/UserMsg', UserMsg)
//引入 我的會員資料編輯
var UserEdit = require('./routes/UserEdit');
app.use('/UserEdit', UserEdit)



//引入 刊登送養
var Foster = require('./routes/Foster');
//const multer = require('multer');
app.use('/Foster', Foster)

//上傳檔案

var upload = multer({ dest: 'upload/' });//設置檔案存放路徑
app.post('/uploadFile', upload.single('uploadFile'), function (req, res) {
  res.send("上傳成功");
})
app.get("/", function (req, res) {
  res.sendfile(__dirname + 'NewsManageList.html', function (err) {
    if (err) res.send(404);
  })
})
//引入 刊登送養審核 檢視
var FosterManageEdit = require('./routes/FosterManageEdit');
app.use('/FosterManageEdit', FosterManageEdit);
//引入 刊登送養審核 查詢
var FosterManageList = require('./routes/FosterManageList');
app.use('/FosterManageList', FosterManageList);
//引入 刊登送養審核 新增
var FosterManageAdd = require('./routes/FosterManageAdd');
app.use('/FosterManageAdd', FosterManageAdd);

// //引入 會員註冊資料 新增
// var Register = require('./routes/Register');
// app.use('/Register', Register)
// // 引入 會員註冊資料編輯
// var Register = require('./routes/Register');
// app.use('/Register', Register);
// // 引入 會員註冊資料刪除
// var Register = require('./routes/Register');
// app.use('/Register', Register);

// 引入 會員管理清單
var UserManageList = require('./routes/UserManageList');
app.use('/UserManageList', UserManageList);
// // 引入 會員管理
// var UserManageAdd = require('./routes/UserManageAdd');
// app.use('/UserManageAdd', UserManageAdd);
// // 引入 會員管理編輯
var UserManageEdit = require('./routes/UserManageEdit');
app.use('/UserManageEdit', UserManageEdit);
// // 引入 最新消息管理刪除
// var NewsManageDel = require('./routes/NewsManageDel');
// app.use('/NewsManageDel', NewsManageDel);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;