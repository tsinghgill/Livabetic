var Sequelize = require('sequelize');

var connection = new Sequelize('livabetic', 'tanny', 'tatti123', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

connection
	.authenticate()
	.then(function(err) {
		console.log('Connection has been established successfully.');
	})
	.catch(function(err) {
		console.log('Unable to connect to the database:', err);
	});

var User = connection.define('user', {
	firstName: {
		type: Sequelize.STRING,
		field: 'first_name',
		validate: {
			notNull: true
		}
	},
	lastName: {
		type: Sequelize.STRING,
		field: 'last_name',
		validate: {
			notNull: true
		}
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		unique: true,
		validate: {
			notNull: true
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			len: [8, 50],
			notNull: true
		}
	}
});

connection
	.sync({
		force: true
	})
	.then(function() {
		var req = {
			user_params: {
				firstname: ,
				lastname: ,
				email: ,
				password:
			} 
		}
		User.create(req,user_params)
	});