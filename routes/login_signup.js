var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:type?', function(req, res, next) {
  if(!req.session.login){
    res.render('LoginSignUp');
  }
  else{
    res.redirect('/')
  }
});

module.exports = router;
