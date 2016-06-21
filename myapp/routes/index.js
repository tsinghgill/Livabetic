// ==================================
// FOR NOW ALL ROUTES ARE HERE
// ==================================

'use strict';

/* Require necessary modules */
var models = require('../config/database');
var User = require('../models/user');
var Log = require('../models/log');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var csv = require('fast-csv');
var multer = require('multer');
/* Commented out in case we need to store the data in a folder */
// var upload = multer({ dest: 'uploads/' }).single('csvdata')
var upload = multer({ inMemory: true }).single('csvdata');
var moment = require('moment');

/* All Routes */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Livabetic' })
});

router.get('/tatti', function(req, res) {
  Log.findAll({
    where: {
      bg_reading: {gt: 0}
    },
    attributes: ['date', 'time', 'bg_reading'],
    group: 'date',
  })
  .then(function(data) {
    res.send(data)
  })
});

router.post('/upload/data', upload, function(req, res) {
	csv.fromString(req.file.buffer.toString(), {headers : true })
	.on("data", function(data){
    debugger;
    function parseCheckFloat(value) {
      if(value === '') {
        return 0
      } else {
        return parseFloat(value)
      }
    };
    function parseCheckInt(value) {
      if(value === '') {
        return 0
      } else {
        return parseInt(value)
      }
    };
    function dateCheck(value) {
      if(moment(value, 'DD/MM/YY').format('DD/MM/YY')==value) {
        return moment(value, 'DD/MM/YY').format('YYYY-MM-DD')
      } else {
        return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
      }
    };
      Log
        .create({
            // date: moment(data['Date'], 'DD-MM-YY'),
            // time: data.Time,
            time: data.Time,
            date: dateCheck(data['Date']),
            timestamp: data.Timestamp,
            bg_reading: parseCheckFloat(data['BG Reading (mmol/L)']),
            bwz_estimate: parseCheckFloat(data['BWZ Estimate (U)']),
            bwz_carb_input: parseCheckInt(data['BWZ Carb Input (grams)']),
            bwz_sensitivity: parseCheckFloat(data['BWZ Insulin Sensitivity (mmol/L)']),
            bwz_correction: parseCheckFloat(data['BWZ Correction Estimate (U)']),
            daily_total: parseCheckFloat(data['Daily Insulin Total (U)'])
          })
        .then(function() {
          Log
          .findOrCreate({where: {timestamp: data.Timestamp }})
          .spread(function(log, created) {
            console.log(log.get({
              plain: true
            }))
            console.log(created)
          })
        }) 
    })
	.on("error", function(data) {
    return false;
  })
  .on("end", function(){
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

/* Unsure why this is commented out... */
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
	res.render('dashboard', { title: 'Dashboard' })
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', { title: 'Profile' })
});

router.get('/charts', isLoggedIn, function(req, res) {
  res.render('charts', { title: 'Charts' })
});

router.get('/nutrition', isLoggedIn, function(req, res) {
  res.render('nutrition', { title: 'Nutrition' })
});

router.get('/exercise', isLoggedIn, function(req, res) {
  res.render('exercise', { title: 'Exercise' })
});

router.get('/logout', function(req, res) {
  res.logout(); //this logout() method is provided by passport and it handles logging out
  res.redirect('/');
});

/* Unsure why this is commented out... */
// router.get('/dashboard', function(req, res) {
// 	res.render('dashboard', { title: 'Livabetic' })
// });

/* This is the middleware used to make sure a user is logged in, 
IE: when we are calling this above between our
path and callback function, this acts like middleware to check 
if user is authenticated already */

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) /* if user is authenticated in the session carry on and no need to resign them in*/
  	return next();
  res.redirect('/'); /* if they are not already logged in then we will redirect them to the homepage*/
}

module.exports = router;
