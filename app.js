const createError = require('http-errors');
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongo = require('mongoose');

const schema =  require('./graphql/schema');
const indexRouter = require('./routes/index')
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');

const url = 'mongodb://127.0.0.1:27017/Product-Store';
const connect = mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

connect.then( db => {
  console.log("Connected Successfully to the server! ");
});



const app = express();


app.use('/graphiql', graphqlHTTP({ schema, graphiql: true}));

// // // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/stylesheets'));
app.use('/js', express.static(__dirname + 'public/javascripts'));

app.use('./',indexRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
