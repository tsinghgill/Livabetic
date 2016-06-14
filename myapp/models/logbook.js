'use strict';
var Sequelize = require('sequelize');
var connection = require('./database').connection;

var Logbook = connection.define('logbook', {
	date: {
		type: Sequelize.DATE,
	},
	time: {
		type: Sequelize.TIME,
	},
	bg_reading: {
		type: Sequelize.FLOAT
		// isEmail: true,
		// unique: true,
		// allowNull: false
	},
	bwz_estimate: {
		type: Sequelize.FLOAT
	},
	bwz_carb_input: {
		type: Sequelize.INTEGER
	},
	daily_total: {
		type: Sequelize.FLOAT
	}
});

module.exports = {
	logbook: Logbook
};