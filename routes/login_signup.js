var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:type?', function(req, res, next) {
  if(res.ses)
  res.render('LoginSignUp');
});

module.exports = router;
