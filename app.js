// needed packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mysql = require("mysql");
const qs = require("querystring")
const session = require("express-session")
// routes require
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let LoginSignupRouter = require('./routes/login_signup');

let app = express();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// DB connection & GET users list
let connection = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"nofap"
})

// login & signup
  // SignUp
app.post('/logsign/signup',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
      body = body + data
  })
  req.on('end',()=>{
      let result = qs.parse(body)
      connection.query(`select * from db_ws where username = '${result.username}'`,(error,results,fields)=>{
        if(results == undefined && result.password_sign==result.ConfirmPassword){
          connection.query(`
            insert into db_ws()
            value('${result.username_sign}','${result.password_sign}','${result.start_day.replaceAll("-",'/')}','0 Days',1)`,
            (error,RES,fields)=>{
              req.session.login = true
              req.session.username = result.username_sign
              res.redirect('/')
            }
          )
        }
        else{
          res.send("Error")
        }
      })
  })
})
  // log in
app.post('/logsign/login',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
    body = body + data
  })
  req.on('end',()=>{
    let result = qs.parse(body)
    connection.query(
      `select * from db_ws where username='${result.username_login}'`,
      (err,results,fields)=>{
        if(results != undefined && results[0].password == result.password_login){
          req.session.login = true
          req.session.username = result.username_login
          res.redirect('/')
        }
        else{
          if(results == undefined) res.send("ERROR: username doesn't exit")
          else res.send("passowrd is wrong")
        }
      }
    )
  }
  )
})
  // log out
app.post('/logsign',(req,res)=>{
  req.session.login = false
  res.redirect('/logsign')
})
// Again (inc attempt)
app.post("/",(req,res)=>{
  connection.query(
    `UPDATE db_ws SET attempt_no=attempt_no+1 WHERE username='${req.session.username}'`,
    (err,result,fields)=>{
      res.redirect('/')
    }
  )
})
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
