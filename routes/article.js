//required dependencies
const express = require('express');
const router = express.Router();
//define article
const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticle);

//export
module.exports = router;