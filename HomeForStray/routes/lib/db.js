var mysql = require('mysql');
// 建立資料庫連線
var pool = mysql.createPool({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'HomeForStray',
    waitForConnections: true,
    connectionLimit: 10
});
module.exports = pool;