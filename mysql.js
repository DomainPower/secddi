var mysql = require('mysql');
var db = mysql.createConnection({
    host:'10.0.16.9',
    user:'root',
    password:'root123',
    database:'nddi',
    port:13306,
})


db.connect();
module.exports=db;