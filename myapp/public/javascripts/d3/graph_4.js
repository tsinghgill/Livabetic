'use strict';

  $.get('/upload/dateBGreading')
  .done(function(res) {

      var date = [];
      var bg_reading = [];

      var data = res.data

console.log(data)

      data.forEach(function(d) {
        date.push(new Date (d['date']).getDate());
        bg_reading.push(parseFloat(d['bg_reading']))
      });
      debugger;

      var datax = [{ 
        x: date,
        y: bg_reading,
        mode: 'lines + markers'
      }];

      var layout = {
        title:'Line and Scatter Plot'
      };

      Plotly.newPlot('blood-sugar-average', datax, layout);

  })
  .fail(function(err) {
    console.log(err)
  })