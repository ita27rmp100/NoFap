var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.login) res.render('index');
  else res.redirect("/logsign")
});

module.exports = router;
