const express = require('express');
const bodyParser = require('body-parser');

const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

categoryRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
}).
get((req, res, next) => {
  res.render('category.html');
}).
post((req, res, next) => {
    res.send('Will add to the category list!');
}).put((req, res, next) => {
    res.send('Will update to the category list!');
}).delete((req, res, next) => {
    res.send('Will delete to the category list!');
});

module.exports = categoryRouter;
