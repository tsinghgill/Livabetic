'use strict';
/* Import necessary modules */
var request = require('request');
var cheerio = require('cheerio');

/* Setup user and URL information --- HARDCODED FOR NOW */
var remainingArray = [];
var targetArray = [];

// var username = 'dsomel21';
var url = 'http://www.myfitnesspal.com/food/diary/dsomel21';

/* Fetch Data */
request(url, function(err, res, body) {
	if (err) {
		console.log(err);
	}
	
	var $ = cheerio.load(body);

	/* Remaining Values */
	var remainingRow = $('.table0 .total.remaining');
	remainingRow.each(function(i, row) {
		// getNutritionalValues($(this));
		$(this).find('.positive').each(function(){
			remainingArray.push($(this).text());
		});
		return remainingArray;
	});

	/* Target Values*/
	var totalRow = $('.table0 .total.alt');
	totalRow.each(function(i, row){
		$(this).find('td').each(function(){
			console.log($(this).text());
			targetArray.push($(this).text());
		});
		return targetArray;
	});


	// function getNutritionalValues(row){
	// 	console.log(row);
	// 	row.find('.positive').each(function(){
	// 		remainingArray.push($(this).text());
	// 	});
	// 	return remainingArray;
	// }
	// console.log(remainingArray)

	global.remaining_values = {
		remaining_calories: parseInt(remainingArray[0].replace(/,/g, '')),
		remaining_carbs: parseInt(remainingArray[1].replace(/,/g, '')),
		remaining_fat: parseInt(remainingArray[2].replace(/,/g, '')),
		remaining_protein: parseInt(remainingArray[3].replace(/,/g, '')),
		remaining_sodium: parseInt(remainingArray[4].replace(/,/g, ''))
	};

	// console.log(remaining_values);

	global.target_values = {
		target_calories: parseInt(targetArray[1].replace(/,/g, '')),
		target_carbs: parseInt(targetArray[2].replace(/,/g, '')),
		target_fat: parseInt(targetArray[3].replace(/,/g, '')),
		target_protein: parseInt(targetArray[4].replace(/,/g, '')),
		target_sodium: parseInt(targetArray[5].replace(/,/g, ''))
	};
	// console.log(target_values);
});

// var MARGIN = { top: 50, right: 0, bottom: 100, left: 30 },
//   /* Initate Variables */
//   WIDTH = 960 - MARGIN.left - MARGIN.right,
//   HEIGHT = 430 - MARGIN.top - MARGIN.bottom,
//   RADIUS = Math.min(WIDTH, HEIGHT) / 2;

// var color = d3.scale.category20();

// var pie = d3.layout.pie()

// var svg = d3.select('#chart').append('svg')
// 	.attr('width', WIDTH)
// 	.attr('height', HEIGHT)
// 	.attr("fill", "pink")
// 	.append('g')
// 	.attr('transform', 'translate(' + WIDTH/2 + ',' + HEIGHT/2 + ')');

// var data = target_values.map(function(d){
// 	console.log(d);
// })


