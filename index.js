//define packages
const path = require('path');
const express = require ('express');
const app = express ();
const mysql = require('mysql');
const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
//add views template engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir:__dirname + '/views/layouts',
}));

//setup static public directory
app.use(express.static('public'));

//use bodyparser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

//mysql
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database joga_mysql");
});

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', {
            articles: articles
        })
    })
});

app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.name AS name, article.slug AS slug, article.image AS image, article.body AS body, author.name AS articleAuthor FROM article  join author on article.author_id = author.id WHERE slug = "${req.params.slug}";`
    let article
    con.query(query, (err,result) => {
        if (err) throw err;
        article = result;
        res.render('article', {
            article:article
        });
    });
});

//listen on port 3000
app.listen(3000, () => {
    console.log('Server started');
});