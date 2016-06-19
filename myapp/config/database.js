// =====================================================
// LATER THIS FILE WILL BE MOVED TO CONFIGURATION FOLDER
// =====================================================

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


connection
	.sync(
	// {force: true}
		)


module.exports = connection;