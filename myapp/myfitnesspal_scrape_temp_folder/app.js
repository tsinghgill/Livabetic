'use strict';
/* Import necessary modules */
var request = require('request');
var cheerio = require('cheerio');

var nutrientArray = [];

/* Setup user and URL information --- HARDCODED FOR NOW */
var username = 'lordtenvit';
var url = 'http://www.myfitnesspal.com/food/diary/lordtenvit';

/* Fetch Data */
request(url, function(err, res, body) {
	if (err) {
		console.log(err);
	}
	var $ = cheerio.load(body);
// console.log(body);
var foodRow = $('.table0 .total.remaining');
foodRow.each(function(i, row) {
	getNutritionalValues($(this));
});

function getNutritionalValues(row){
	row.find('.positive').each(function(){
// console.log($(this).text());
nutrientArray.push($(this).text());
});
	return nutrientArray;
}

for (var i = 0; i < nutrientArray.length; i++){
	console.log(nutrientArray[i]);
}	

});
