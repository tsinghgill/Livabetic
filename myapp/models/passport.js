var LocalStrategy = require('passport-local').Strategy;
var User = require('./user').user;
var passport = require('passport')


// UNDERSTAND HOW OTHER WAY OF EXPORTING WORKS
module.exports = function(passport) {

	// serializing and deserializing user here
	passport.serializeUser(function(user, done) {
		done(null, user.id)
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
			done(null, user)
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // this lets us pass back the entire request to the callback below
	}, // what we defined above with new LocalStrategy is kind of like middleware that does stuff, below is the actual callback function
	function(req, email, password, done) {
		// so in the above call back we are passing in the request along with the email and password provided, the done function actually tells passport we are done passing in stuff
		// this nexttick thing is saying to fire the code below it
		process.nextTick(function() {
			// findOne is saying find a user whose email is the same as the forms email, this checks to see if the user trying to signup already exists
			User.findOne({ where: { email: email }}).then(function(err, user) {
				if(err) {
					return done(err);
				} else if(user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					var user_params = {
						first_name: req.body.first_name,
						last_name: req.body.last_name,
						email: email,
						password: User.generateHash(password)
					}
					User.create(user_params).then(function(user) {
						return done(null, user);
					});
					// console.log('fewewfweffwe')
					// var newUser = new User();

					// newUser.email = email;
					// newUser.password = newUser.generateHash(password); // THIS GENERATE HASH FUNCTION NEEDS TO BE IMPORTED SOME HOW, RECALL IT WAS GIVING US AN ERROR

					// newUser.save(function(err) {
					// 	if(err)
					// 		throw err;
					// return done(null, newUser);
					// });
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		// console.log(email)
		User.findOne({ where: { email: email }}).then(function(err, user) {
			// console.log('data', data);
			if(err) {
				// console.log(err.body);
				return done(err);
			} if(!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			} else if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Wrong password.'));
			} else {
				return done(null, user);
			}
		})
	}))
};