'use strict';
/* Import necessary modules */
var request = require('request');
var cheerio = require('cheerio');

/* Google Fit Scraper */
var url = 'https://fit.google.com/u/0';
var finalArray = [];

request(url, function(err, res, body) {
	if (err) {
		console.log(err);
	}
	
	var $ = cheerio.load(body);

	var finalRow = $('span .WHFxQb');
	finalRow.each(function(i, row){
		console.log(row);
		$(this).find('td').each(function(){
			targetArray.push($(this).text());
			finalArray.push(parseInt($(this).text()));
		});
		return finalArray.filter(isANumber);
	});
	// console.log(finalArray)
});