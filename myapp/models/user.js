// Here we have defined our users model
// We are referencing connection from the database to let the program
// know that we are establishing a connection with our database
// Thus connection is a module.exports in database.js, being req here!

var Sequelize = require('sequelize');
var connection = require('./database').connection
var bcrypt = require('bcrypt-nodejs');

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
		});

User.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = {
	user: User
}