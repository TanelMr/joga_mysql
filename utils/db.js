const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database joga_mysql");
});

module.exports = db;