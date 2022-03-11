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
const articleRoutes = require('./routes/article');
const authorRoutes = require('./routes/author');

//use routes
app.use('/', articleRoutes);
app.use('/article',articleRoutes);
app.use('/author', authorRoutes);

//listen on port 3000
app.listen(3000, () => {
    console.log('Server started');
});