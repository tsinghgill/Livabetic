'use strict';


var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// data = [ 
//   { date: '2016-03-17T00:00:00.000Z', daily_total: 53.4 },
//   { date: '2016-03-18T00:00:00.000Z', daily_total: 62.7 },
//   { date: '2016-03-19T00:00:00.000Z', daily_total: 49 },
//   { date: '2016-03-20T00:00:00.000Z', daily_total: 59.6 },
//   { date: '2016-03-21T00:00:00.000Z', daily_total: 55.2 },
//   { date: '2016-03-22T00:00:00.000Z', daily_total: 64 },
//   { date: '2016-03-23T00:00:00.000Z', daily_total: 51.4 }
// ];

  $.get('/upload/dailytotalinsulin')
  .done(function(res) {
      var xDate = [];
      var yTotal = [];
      // Plotly.d3.csv('carelink.csv', function(error, data) {

      var data = res.data

      data.forEach(function(d) { //2013-10-04 22:23:00
        xDate.push(new Date (d['date']).getDate());
        yTotal.push(parseFloat(d['daily_total']))
      });

      var data = [{
        x: xDate,
        y: yTotal,
        type: 'bar'
      }];

      var layout = {
          title: 'Daily Total Insulin',
          showlegend: false
        };
      Plotly.newPlot('myDiv', data, layout, {showLink: false});
  })
  .fail(function(err) {
    console.log(err)
  })


