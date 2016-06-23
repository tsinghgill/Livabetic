'use strict';

var run = 1.2;

var bike = 2.7;
var swim = 0.4;
var workout = [bike, swim, run];

var exercise_bar_data = [
{
  x: workout,
  y: ['Biking', 'Swim', 'Run'],
  orientation: 'h',
  type: 'bar',
  marker: {
    color: '#1abc9c',
    width: 1
  }
}];

var layout = {
  height: 600,
  width: 750
};

Plotly.newPlot('exercise-bar', exercise_bar_data, layout);
