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
    // Get all users ordered by streak days (assuming 'streak_days' column exists)
    connection.query(`SELECT username, streak_days FROM db_ws ORDER BY streak_days DESC`, (err, users) => {
      if (err) {
      return next(err);
      }
      // Get current user data
      connection.query(`SELECT * FROM db_ws WHERE username = ?`, [req.session.username], (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.length > 0) {
        // Prepare leaderboard object
        const leaderboard = users.map((user) => ({
                              username: user.username,
                              streak_days: user.streak_days
                          }));
        res.render('index', {
          attempt_no: results[0].attempt_no,
          max: results[0].max,
          start_count: results[0].start_count,
          leaderboard
        });
      }
      return;
      });
    });
    return;
  }
  else res.redirect("/logsign")
});

module.exports = router;
