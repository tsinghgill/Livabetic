'use strict';
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


	/* Set relation (hasMany) with users */
// 	,
// 	user_id: {
// 		type: Sequelize.INTEGER,
// 		allow_null: false,
// 		references: {
// 			model: 'user',
// 			key: id
// 		}
// 	}
// },{
// 	tableName: 'logbooks',
// 	underscored: true,
// 	timestamps: false
});

// console.log(User);

User.hasMany(Log, {as: 'user'});
// Log.belongsTo(User, {foreignKeyConstraint: true, foreignKey: 'user_id'});
// Log.belongsTo(User, {as: 'user_id'});

// Logbook.hasMany(User, {foreignKeyConstraint: true, foreignKey: 'user_id'});
// this.User.has


module.exports = Log;