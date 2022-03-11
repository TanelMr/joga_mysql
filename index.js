//define packages
const path = require('path');
const express = require ('express');
const app = express ();
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

//import article route
const articleRoutes = require('./routes/article')

//use routes
app.use('/', articleRoutes);
app.use('/article',articleRoutes);

//author article controller
app.get('/author/:author_id', (req, res) => {
    let query1 = `SELECT * FROM article WHERE author_id = "${req.params.author_id}"`;
    let query2 = `SELECT id, name as authorName from author where id = "${req.params.author_id}"`;
    let author;
    let article;
    con.query(query1 , (err,result) => {
        if (err) throw err;
        article = result;
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