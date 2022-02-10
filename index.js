//define packages
const express = require ('express');
const app = express ();

const path = require("path");
const hbs = require('express-handlebars');
//add views directory path
app.set('views', path.join(__dirname, 'views'));
//add views template engine
app.set('view engine', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir:__dirname + '/views/layouts'
}));

//use bodyparser
const bodyparser = require('body-parser');
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
    console.log("Connected to database joga_mysql");
});

//listen on port 3000
app.listen(3000, ()=>{
    console.log('Server started');
});