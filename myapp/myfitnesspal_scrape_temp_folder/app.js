'use strict';
/* Import necessary modules */
var request = require('request');
var cheerio = require('cheerio');
var Diary = require('../models/diary');

// myFitnessPal Scrapper
var url = 'http://www.myfitnesspal.com/food/diary/dsomel21';

request(url, function(err, res, body) {
	if (err) {
		console.log(err);
	}
	
	var $ = cheerio.load(body);

	function isANumber(value) {
		return value >= 0;
	}

	var finalArray = [];

	var finalRow = $('.table0 tr.bottom');
	finalRow.each(function(i, row){
		$(this).find('td').each(function(){
			finalArray.push(parseInt($(this).text()));
		});
		return finalArray.filter(isANumber);
	});

	var filteredArray = finalArray.filter(isANumber)

	var calories = filteredArray[0]+filteredArray[6]+filteredArray[12]+filteredArray[18]
	var carbs = filteredArray[1]+filteredArray[7]+filteredArray[13]+filteredArray[19]
	var fat = filteredArray[2]+filteredArray[8]+filteredArray[14]+filteredArray[20]
	var protein = filteredArray[3]+filteredArray[9]+filteredArray[15]+filteredArray[21]
	var sodium = filteredArray[4]+filteredArray[10]+filteredArray[16]+filteredArray[22]
	var sugar = filteredArray[5]+filteredArray[11]+filteredArray[17]+filteredArray[23]

	Diary.create({
		calories: calories,
		carbs: carbs,
		fat: fat,
		protein: protein,
		sodium: sodium,
		sugar: sugar
	})
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


