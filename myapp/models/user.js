// Here we have defined our users model
// We are referencing connection from the database to let the program
// know that we are establishing a connection with our database
// Thus connection is a module.exports in database.js, being req here!

/* Require necessary modules, models, etc.. */
var Sequelize = require('sequelize');
var connection = require('./database').connection
var bcrypt = require('bcrypt-nodejs');
var chalk = require('chalk');

var User = connection.define('user', {
	first_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
},
{
	/* puts underscores model properties */
	underscored:true
});

User.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(password1, password2) {
	console.log('password1', password1);
	console.log('password2', password2);
	var x = bcrypt.compareSync(password1, password2);
	console.log(x);
	return x
};

/* Export this as an OBJECT, since there is no necessity to store it */
module.exports = User;