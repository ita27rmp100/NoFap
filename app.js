// needed packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mysql = require("mysql")
const session = require("express-session")
// routes require
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let LoginSignupRouter = require('./routes/login_signup');

let app = express();

// DB connection & GET users list
let connection = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"nofap"
})

var usersList = {}, usernames , passowrds 
function gettingUsers(){
  Connection.query('select * from db_ws',function(error,results,fields) {
  usernames = results.map(row => row.username)
  passowrds = results.map(row => row.password)
  for(i=0;i<(Object.keys(usernames).length);i++){
    usersList[usernames[i]]=passowrds[i]
  }
})
}
gettingUsers()
// login & signup


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/logsign",LoginSignupRouter)

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
