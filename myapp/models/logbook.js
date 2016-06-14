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
	},
	bwz_estimate: {
		type: Sequelize.FLOAT
	},
	bwz_carb_input: {
		type: Sequelize.INTEGER
	},
	bwz_sensitivity: {
		type: Sequelize.FLOAT 
	},
	bwz_correction: {
		type: Sequelize.FLOAT 
	},
	daily_total: {
		type: Sequelize.FLOAT
	}
});

module.exports = {
	logbook: Logbook
};