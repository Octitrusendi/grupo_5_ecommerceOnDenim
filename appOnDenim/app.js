var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookies = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddelware = require('./middleware/usserLoggedMiddelware');

var indexRouter = require('./routes/mainRoutes');
var productRouter = require('./routes/productRoutes');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(cookies());
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'shhh, secreto',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(userLoggedMiddelware);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());

app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/productos', productRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
