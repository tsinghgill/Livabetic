var User = require('./user');
var Sequelize = require('sequelize');
var connection = require('../config/database');

var Diary = connection.define('diary', {
  calories: {
    type: Sequelize.INTEGER
  },
  carbs: {
    type: Sequelize.INTEGER
  },
  fat: {
    type: Sequelize.INTEGER
  },
  protein: {
    type: Sequelize.INTEGER
  },
  sodium: {
    type: Sequelize.INTEGER
  },
  sugar: {
    type: Sequelize.INTEGER
  },
  water: {
    type: Sequelize.INTEGER
  }
});

User.hasMany(Diary, {as: 'user'});

module.exports = Diary;