// ==================================
// FOR NOW ALL ROUTES ARE HERE
// ==================================

'use strict';

/* Require necessary modules */
var models = require('../config/database');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var csv = require('fast-csv');
var multer = require('multer');
/* Commented out in case we need to store the data in a folder */
// var upload = multer({ dest: 'uploads/' }).single('csvdata')
var upload = multer({ inMemory: true }).single('csvdata');

/* All Routes */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Livabetic' })
});

router.post('/upload/data', upload, function(req, res) {
	csv.fromString(req.file.buffer.toString(), {headers : true })
	.on("data", function(data){
		/* For debugging::: to verify it's executing line by line*/
      // console.log('.');

      /* For debugging::: to distinting days */
      // if (data['Daily Insulin Total (U)'] > 0) {
      //   console.log('------------------------------------------------------------------------------------------------');
      // }

      console.log(
      	/* For debugging::: verifying we have the right data*/
      						// 'Index:', data['Index'], 
      						'Date:', data['Date'],
      						'Time:', data['Time'], 
      						// 'BG Reading (mmol/L):', data['BG Reading (mmol/L)'],
      						// 'BWZ Estimate (U):', data['BWZ Estimate (U)'],
      						// 'BWZ Carb Input (grams)',data['BWZ Carb Input (grams)'],
      						// 'BWZ Insulin Sensitivity (mmol/L):', data['BWZ Insulin Sensitivity (mmol/L)'],
      						'BWZ Correction Estimate (U):', data['BWZ Correction Estimate (U)'],
      						'Daily Insulin Total (U):', data['Daily Insulin Total (U)']
      						);
    })
	.on("end", function(){
		console.log("[Completed]");
      // console.log(dilraj);
      res.send("Yay!");
    });

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
