'use strict';
d3.csv("carelink.csv", function(error, data) {
  var myData = [
    {
      key: "Blood Sugar",
      values: []
    }
  ];
  
  data.forEach(function(d) { 
    // console.log(d['BWZ Carb Input (grams)'])
    // d['BWZ Carb Input (grams)'] = +d['BWZ Carb Input (grams)'];
    // debugger;
    myData[0].values = data.map(function(d){
      // debugger;
      d.Date = moment(d.Date, 'DD/MM/YY').format("MMM Do");
      d.Time = moment(d.Time, 'HH:mm:ss').hours();
      // d['BWZ Carb Input (grams)'] = +d['BWZ Carb Input (grams)'];
      if (typeof d['BG Reading (mmol/L)'] === 'undefined'){
        d['BG Reading (mmol/L)'] = 0;
      }
      if (d['BG Reading (mmol/L)'].length > 0){
        d['BG Reading (mmol/L)'] = parseFloat(d['BG Reading (mmol/L)']);
      }
      return d;
    })
  });     

  var chart;

  nv.addGraph(function() {
    chart = nv.models.scatterChart()
      .showDistX(true)
      .showDistY(true)
      .duration(300)
      .color(d3.scale.category10().range())
      .x(function (d) { 
        return d.Time //, d.Date            
      })
      .y(function (d) { 
        return d['BG Reading (mmol/L)'] 
      });

    chart.dispatch.on('renderEnd', function(){
      console.log('render complete');
    });

    var mintime = new Date('00:00:00');
    var maxtime = new Date('23:59:59');

    var x = d3.time.scale()
      .domain([mintime, maxtime]);

    chart.xAxis
      .scale(x)
      .axisLabel('Time')
      .rotateLabels(-45)
        
    chart.yAxis.tickFormat(d3.format(''));

    d3.select('#test1 svg')
      .datum(myData)
      .call(chart);

    nv.utils.windowResize(chart.update);
      chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); 
      });
      return chart;
  });
});