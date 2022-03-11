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

//homepage controller
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

//article controller
app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.name AS name, article.slug AS slug, article.image AS image,author.id AS author_id, article.body AS body, author.name AS articleAuthor FROM article  join author on article.author_id = author.id WHERE slug = "${req.params.slug}";`
    let article
    con.query(query, (err,result) => {
        if (err) throw err;
        article = result;
        res.render('article', {
            article:article
        });
    });
});

//author article controller
app.get('/author/:author_id', (req, res) => {
  /*  let query = `SELECT article.name AS name, article.slug AS slug, article.image AS image,author.id AS author_id, article.body AS body, author.name AS articleAuthor FROM article  join author on article.author_id = author.id WHERE author.id = "${req.params.author_id}";` */
    let query1 = `SELECT name, slug, image, author_id FROM article WHERE author_id = "${req.params.author_id}"`;
    let query2 = `SELECT id, name as authorName from author where id = "${req.params.author_id}"`;
    let author;
    let article;


    con.query(query1 , (err,result) => {
        if (err) throw err;
        article = result;
        console.log (result)
        con.query(query2 , (err,result) => {
            if (err) throw err;
            author = result;
        res.render('author', {
            author: author,
            article: article
            });
        });
    });
});

//listen on port 3000
app.listen(3000, () => {
    console.log('Server started');
});