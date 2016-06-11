var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Livabetic' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Livabetic' });
});

module.exports = router;
