/* Testing Parse */

/* Require necessary modules */
var Papa = require('babyparse');
// var csv = require('fast-csv');
// var fs = require('fs');
// var file = 'carelink.csv';

var results = Papa.parse(file);
console.log(results.meta.delimiter);

var data = Papa.parse(file, {
	// dynamicTyping: false,
	// delimiter: ',',
	// step: function(results){
	// 	console.log(results.data);
	// }
	console.log(data);
});

var results = Papa.parse(file, {
	delimiter: ',',
	dynamicTyping: false,
});