var r = require('./app.js').remainingArray;
if (typeof r !== 'undefined') {
	
	// console.log(r);

	var MARGIN = { top: 50, right: 0, bottom: 100, left: 30 },
	  /* Initate Variables */
	  WIDTH = 960 - MARGIN.left - MARGIN.right,
	  HEIGHT = 430 - MARGIN.top - MARGIN.bottom,
	  RADIUS = Math.min(WIDTH, HEIGHT) / 2;

	var color = d3.scale.category20();

	var pie = d3.layout.pie()

	var svg = d3.select('#chart').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
		.attr("fill", "pink")
		.append('g')
		.attr('transform', 'translate(' + WIDTH/2 + ',' + HEIGHT/2 + ')');

	var data = r.map(function(d){
		console.log(d);
	})
}