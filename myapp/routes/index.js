// ==================================
// FOR NOW ALL ROUTES ARE HERE
// ==================================

var models = require('../models/database')
var User = require('../models/user').user
var express = require('express');
var router = express.Router();
var passport = require('passport')

// ALL ROUTES
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Livabetic' })
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Livabetic', message: req.flash('loginMessage') }) // we will create the message in our passport.js file
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/dashboard',
	failureRedirect : '/',
	failureFlash : true
}));

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Livabetic', message: req.flash('signupMessage') }) // we will create the message in our passport.js file
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/dashboard',
	failureRedirect : '/',
	failureFlash : true
	})
)

// router.post('/signup', (req, res) => {
// 	var user_params = {
// 		first_name: req.body.first_name,
// 		last_name: req.body.last_name,
// 		email: req.body.email,
// 		password: req.body.password
// 	}
// 	User.create(user_params).then(function() {
// 		res.redirect('/dashboard')
// 	});
// });

router.get('/dashboard', isLoggedIn, function(req, res) {
	res.render('dashboard')
});

router.get('/logout', function(req, res) {
	res.logout(); //this logout() method is provided by passport and it handles logging out
	res.redirect('/');
})

// router.get('/dashboard', function(req, res) {
// 	res.render('dashboard', { title: 'Livabetic' })
// });

// this is the middleware used to make sure a user is logged in, IE: when we are calling this above between our
// path and callback function, this acts like middleware to check if user is authenticated already
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) // if user is authenticated in the session carry on and no need to resign them in
		return next();
	res.redirect('/'); // if they are not already logged in then we will redirect them to the homepage
}

module.exports = router;
