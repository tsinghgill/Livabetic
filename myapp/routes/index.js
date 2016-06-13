var models = require('../models/database')
var user = require('../models/user').user
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Livabetic' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Livabetic' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Livabetic'})
})

router.post('/signup', (req, res) => {
	var user_params = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password
	}
	user.create(user_params).then(function() {
		res.redirect('/dashboard')
	})
})

router.get('/dashboard', function(req, res) {
	res.render('dashboard', { title: 'Livabetic' })
})

module.exports = router;
