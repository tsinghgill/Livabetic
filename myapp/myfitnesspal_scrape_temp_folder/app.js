'use strict';
/* Import necessary modules */
var request = require('request');
var cheerio = require('cheerio');

/* Setup user and URL information --- HARDCODED FOR NOW */
var nutrientArray = [];

// var username = 'lordtenvit';
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



console.log(nutrientArray);
// for (var i = 0; i < nutrientArray.length; i++){
// 	console.log(nutrientArray[i]);
// }

// console.log(nutrientArray[0])

// var nutrients = {
// 	calories: parseInt(nutrientArray[0].replace(/,/g, '')),
// 	carbs: parseInt(nutrientArray[1].replace(/,/g, '')),
// 	fat: parseInt(nutrientArray[2].replace(/,/g, '')),
// 	protein: parseInt(nutrientArray[3].replace(/,/g, '')),
// 	sodium: parseInt(nutrientArray[4].replace(/,/g, ''))
// };
// console.log(nutrients);	

});
