var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:type?', function(req, res, next) {
  res.render('LoginSignUp');
});

module.exports = router;
