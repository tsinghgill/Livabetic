/* Initiate Variables */

var nutritionalData = [
{
  // id: 1,
  calories: 1939,
  carbs: 224,
  fat: 74,
  protein: 72,
  sodium: 1662,
  sugar: 114,
  water: null,
  // createdAt: "2016-06-21T18:57:03.038Z",
  // updatedAt: "2016-06-21T18:57:03.038Z",
  // user_id: null
}
];

var WIDTH = 360,
    HEIGHT = 360,
    RADIUS = Math.min(WIDTH, HEIGHT) /2;

var legacySize = 12,
    legacySpacing = 15;

var color = d3.scale.category10();

var svg1 = d3.select('#nutritional-pie-chart')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .append('g')
  .attr('transform', 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')');

var arc = d3.svg.arc()
    .outerRadius(RADIUS - 10)
    .innerRadius(140);

var nutritionalData = nutritionalData[0];
var nutritionalDataKeys = Object.keys(nutritionalData);
var nutritionalDataArray = [];
nutritionalDataKeys.forEach(function(key){
    nutritionalDataArray.push({
        "label": key.toString(),
        "value": nutritionalData[key]
    });
});

var pie = d3.layout.pie()
  .value(function(d, i) { 
    return d.value;
  });

var path = svg1.selectAll('path')
  .data(pie(nutritionalDataArray))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    debugger;
    return color(d.data.label);
  });


/* Set Up The Legacy (Panda, Panda, Panda, Panda Panda..!*/
var legacy = svg1.selectAll('.legacy')
  .data(color.domain())
  // .data(nutritionalData)
  .enter()
  .append('g')
  .attr('class', 'legacy')
  .attr('transform', function(d, i) {
    var HEIGHT = legacySize + legacySpacing;         
    var offset =  HEIGHT * color.domain().length / 2;    
    var horz = -2 * legacySize;                      
    var vert = i * HEIGHT - offset;                      
    return 'translate(' + horz + ',' + vert + ')';
  });

  legacy.append('circle')
    .attr('cx', legacySize)
    .attr('cy', legacySize)
    .attr('r', legacySize)
    .style('fill', color)
  
  legacy.append('text')
    .attr('x', legacySize + legacySpacing)
    .attr('y', legacySize - legacySpacing + 18)
    .text(function(d) { 
      return d.toUpperCase(); 
  }); 