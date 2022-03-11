const con = require('../utils/db');

//homepage controller
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', {
            articles: articles
        })
    })
};

//article controller
const getArticle = (req, res) => {
    let query = `SELECT article.name AS name, article.slug AS slug, article.image AS image,author.id AS author_id, article.body AS body, author.name AS articleAuthor FROM article  join author on article.author_id = author.id WHERE slug = "${req.params.slug}";`
    let article
    con.query(query, (err,result) => {
        if (err) throw err;
        article = result;
        res.render('article', {
            article:article
        });
    });
};

//export controller functions
module.exports = {
    getAllArticles,
    getArticle
};