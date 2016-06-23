'use strict';

var fat = 71;
var prot = 59;
var carbs = 120;
var macro_nut = [fat, prot, carbs];

var macro_data = [
{
  values: macro_nut,
  labels: ['Protein', 'Fat', 'Carbs'],
  hole: .95,
  type: 'pie',
  hoverinfo: 'percent',
  textinfo: 'value'
}];

var layout = {
  height: 600,
  width: 750
};

Plotly.newPlot('macro', macro_data, layout);
