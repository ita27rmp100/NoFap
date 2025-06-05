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
    connection.query(`SELECT username, start_count FROM db_ws ORDER BY start_count asc`, (err, users) => {
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
        // Sort users by start_count (date) descending
        const leaderboard = users
          .sort((a, b) => {
            const [ad, am, ay] = String(a.start_count).split('/');
            const [bd, bm, by] = String(b.start_count).split('/');
            // Sort from higher to lower (most recent to oldest)
            return new Date(`${am}/${ad}/${ay}`) - new Date(`${bm}/${bd}/${by}`);
          })
          .map((user, i) => {
            const [d, m, y] = String(user.start_count).split('/');
            const days = Math.floor((new Date() - new Date(`${m}/${d}/${y}`)) / (1000 * 60 * 60 * 24));
            if(user.username == req.session.username && days >= parseInt(results[0].max)){
              results[0].max = `${days} Days`
              console.log(results[0].max)
              connection.query(
                `UPDATE db_ws SET max = ? WHERE username = ?`,
                [results[0].max, req.session.username]
              )
            }
            return `<tr class="${user.username == req.session.username ? 'table-success' : ''}">
              <td>${i + 1}</td>
              <td>${user.username}</td>
              <td>${days}</td>
            </tr>`;
          });

        const table = leaderboard.join('');
        res.render('index', {
          attempt_no: results[0].attempt_no,
          max: results[0].max,
          start_count: results[0].start_count,
          table
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
