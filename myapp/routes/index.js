// ==================================
// FOR NOW ALL ROUTES ARE HERE
// ==================================

'use strict';

/* Require necessary modules */
var models = require('../config/database');
var User = require('../models/user');
var Log = require('../models/log');
var Diary = require('../models/diary');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var csv = require('fast-csv');
var multer = require('multer');
var upload = multer({ inMemory: true }).single('csvdata');
var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');
var Sequelize = require('sequelize');


/* All Routes */
router.get('/', function(req, res, next) {
  // // DAILY TOTAL WITH DATE QUERY
  // var totals = []
  // var instance = function(inst) {
  //   totals.push(inst.get())
  // }
  // Log.findAll({
  //   attributes: ['date', 'daily_total'],
  //   where: { daily_total: { gt: 0 } }
  // }).then(function(data) {
  //   data.forEach(instance)
  //   console.log(totals)
  // })

  // // AVG BG READING OF EACH DAY QUERY
  // var totals = []
  // var instance = function(inst) {
  //   totals.push(inst.get())
  // }
  // Log.findAll({
  //   attributes: ['date', [models.Sequelize.fn('AVG', models.Sequelize.col('bg_reading')), 'bg_reading']],
  //   where: { bg_reading: { gt: 0 }},
  //   group: 'date',
  //   order: '"date" ASC'
  // }).then(function(data) {
  //   data.forEach(instance)
  //   console.log(totals)
  // })

  // // // AVG BG READING OF EACH DAY FOR 3 MONTHS WITH DATE QUERY
  // var totals = []
  // var instance = function(inst) {
  //   totals.push(inst.get())
  // }
  // Log.findAll({
  //   attributes: [[models.Sequelize.fn('AVG', models.Sequelize.col('bg_reading')), 'bg_reading']],
  //   limit: 90
  // }).then(function(data) {
  //   data.forEach(instance)
  //   console.log(totals)
  // })

  // // AVG BG READING FOR 3 MONTHS WITHOUT DATE QUERY
  // var totals = []
  // var instance = function(inst) {
  //   totals.push(inst.get())
  // }
  // Log.findAll({
  //   attributes: [[models.Sequelize.fn('AVG', models.Sequelize.col('bg_reading')), 'bg_reading']],
  //   group: 'date',
  //   limit: 90
  // }).then(function(data) {
  //   data.forEach(instance)
  //   console.log(totals)
  // })

  // AVG BG READING OF EACH DAY FOR 3 MONTHS WITH DATE QUERY
  var totals = []
  var instance = function(inst) {
    totals.push(inst.get())
  }
  Log.findAll({
    attributes: ['timestamp', 'bg_reading', 'bwz_carb_input'],
    where: { $or: [ { bg_reading: { gt: 0 } }, { bwz_carb_input: { gt: 0 } } ] },
    limit: 100
  }).then(function(data) {
    data.forEach(instance)
    console.log(totals)
  })

	res.render('index', { title: 'Livabetic' })
});

router.get('/tatti', function(req, res) {
  Diary.findAll({
    limit: 2
  })
  .then(function(data) {
    res.send(data)
  })
});

router.post('/upload/data', upload, function(req, res) {
	csv.fromString(req.file.buffer.toString(), {headers : true })
	.on("data", function(data){
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

router.get('/dashboard', isLoggedIn, function(req, res) {
  // console.log(req.params.user)
	res.render('dashboard', { title: 'Dashboard' })
  // console.log(app.get('user'))
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

router.get('/myfitnesspal', isLoggedIn, function(req, res) {
  res.render('myfitnesspal', { title: 'myFitnessPal' })
});

router.post('/upload/myfitnesspal', function(req, res) {

  // myFitnessPal Scrapper
  var url = 'http://www.myfitnesspal.com/food/diary/dsomel21';

  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    }
    
    var $ = cheerio.load(body);

    function isANumber(value) {
      return value >= 0;
    }

    var finalArray = [];

    var finalRow = $('.table0 tr.bottom');
    finalRow.each(function(i, row){
      $(this).find('td').each(function(){
        finalArray.push(parseInt($(this).text()));
      });
      return finalArray.filter(isANumber);
    });

    var filteredArray = finalArray.filter(isANumber)

    var calories = filteredArray[0]+filteredArray[6]+filteredArray[12]+filteredArray[18]
    var carbs = filteredArray[1]+filteredArray[7]+filteredArray[13]+filteredArray[19]
    var fat = filteredArray[2]+filteredArray[8]+filteredArray[14]+filteredArray[20]
    var protein = filteredArray[3]+filteredArray[9]+filteredArray[15]+filteredArray[21]
    var sodium = filteredArray[4]+filteredArray[10]+filteredArray[16]+filteredArray[22]
    var sugar = filteredArray[5]+filteredArray[11]+filteredArray[17]+filteredArray[23]

    Diary.create({
      calories: calories,
      carbs: carbs,
      fat: fat,
      protein: protein,
      sodium: sodium,
      sugar: sugar
    })
    .then(function() {
      Diary
    .findOrCreate({where: {sodium: sodium }})
    .spread(function(diary, created) {
      console.log(diary.get({
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
})

router.get('/logout', function(req, res) {
  res.logout(); //this logout() method is provided by passport and it handles logging out
  res.redirect('/');
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) /* if user is authenticated in the session carry on and no need to resign them in*/
  	return next();
  res.redirect('/'); /* if they are not already logged in then we will redirect them to the homepage*/
}

module.exports = router;
