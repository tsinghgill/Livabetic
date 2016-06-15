/* Require modules, models, etc. necessary for Log  */
var User = require('./user');
var Sequelize = require('sequelize');
var connection = require('./database').connection;

var Log = connection.define('log', {
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

/* Commented out in case of debugging. */
// console.log('>>>>>>>', 	User);

/* Set relation (hasMany) with logs */
User.hasMany(Log, {as: 'user'});

/* Export the Log object so that we can later push the parsed items into it */
module.exports = Log;