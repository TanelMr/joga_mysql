//required dependencies
const express = require('express');
const router = express.Router();
//define article
const authorController = require('../controllers/author');

router.get('/:author_id', authorController.author);

//export
module.exports = router;