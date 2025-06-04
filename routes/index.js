const express = require('express');
const router = express.Router();
const mysql = require("mysql")

// DB connection
let connection = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"nofap"
})

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    connection.query(`select * from db_ws where username='${req.session.username}'`, (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.length > 0) {
        res.render('index', {
          attempt_no: results[0].attempt_no,
          max: results[0].max,
          start_count: results[0].start_count
        });
      }
      // Prevent double render
      return;
    });
    return;





    res.render('index')
  }
  else res.redirect("/logsign")
});

module.exports = router;
