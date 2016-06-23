'use strict';
/* Get Users Steps Taken & Step Goals */
var steps = 5120;
var steps_goals = 10000 - steps;
var step_counter_data = [steps, steps_goals];

var step_pie_data = [
{
  values: step_counter_data,
  labels: ['Steps', 'Remaining'],
  hole: .95,
  type: 'pie',
  hoverinfo: 'value',
  textinfo: 'label'
}];

var layout = {
  height: 600,
  width: 750
};

Plotly.newPlot('ex-step-pies', step_pie_data, layout);
