var http = require("http");  //含入http模組
var server = http.createServer(function (req, res) {  //建立伺服器
 res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
 res.end('這是第一個node.js程式 test test');
});
server.listen(3000);  //「3000」是埠號,使用者可自修改
console.log("listeming at http://localhost:3000");