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
  suger: {
    Sequelize.INTEGER
  },
  water: {
    Sequelize.INTEGER
  }
});

User.hasMany(DiarySS, {as: 'user'});

module.exports = Diary;