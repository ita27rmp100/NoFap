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

// DB connection & GET users list
let connection = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"nofap"
})

var usersList = {}, usernames , passowrds 
function gettingUsers(){
  connection.query('select * from db_ws',function(error,results,fields) {
  usernames = results.map(row => row.username)
  passowrds = results.map(row => row.password)
  for(i=0;i<(Object.keys(usernames).length);i++){
    usersList[usernames[i]]=passowrds[i]
  }
})
}
gettingUsers()
// login & signup
  // SignUp
app.post('/logsign/signup',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
      body = body + data
  })
  req.on('end',()=>{
      let result = qs.parse(body)
      console.log("The list nta3 form : ")
      console.log(result)
      connection.query(`select * from db_ws where username = '${result.username}`,(error,results,fields)=>{
        if(results == undefined && result.password_sign==result.ConfirmPassword){
          let date = new Date()
          let start_count = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
          connection.query(`
            insert into db_ws()
            value('${result.username_sign}','${result.password_sign}','${start_count}','0 Days, 0 Hours',1)`,
            (error,RES,fields)=>{
              req.session.login = true
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
app.post('/logsign/log-in',(req,res)=>{
  gettingUsers()
  let body = '' , password
  req.on('data',(data)=>{
    body = body + data
  })
  req.on('end',()=>{
    let result = qs.parse(body) , errorOrder = 'try log-in into this website again please .'
    connection.query
    if(result.username in usersList){
      if(result.password == usersList[result.username]){
        req.session.login = true
        res.redirect('/')
      }else{
        res.status(400).send('Your password is incorrect , ' + errorOrder);
      }
    }
    else{
      res.status(400).send('Your password is incorrect , ' + errorOrder);
    }
  }
  )
})
  // log out
app.post('/',(req,res)=>{
  req.session.login = false
  res.redirect('/log-in')
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
