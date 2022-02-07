//define packages
const express = require ('express');
const path = require("path");
const app = express ();
const bodyparser = require('body-parser');

//public directory
app.use(express.static('public'));

//add views template engine
//app.set('view engine', 'ejs');

//add views directory path
app.set('views', path.join(__dirname, 'views'));

//use bodyparser
app.use(bodyparser.urlencoded({extended:true}));

//mysql
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//listen on port 3000
app.listen(3000, ()=>{
    console.log('Server started');
});