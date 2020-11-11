var parseDate = d3.timeParse('%m/%d/%Y');

function lineChart(data){

    var maxDate  = d3.max(data, function(d){return d.date; });
    var minDate  = d3.min(data, function(d){return d.date; });
    var maxCount = d3.max(data, function(d){return d.count;});

    var width  = 1500;
    var height = 500;
    var margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    };

    var svg = d3.select('#vis')
    .append('svg')
    .attr('width' , width)
    .attr('height', height)
    .style('background', '#efefef');

    var chartGroup = svg
    .append('g')
    .attr('transform','translate(' + margin.left +',' + margin.top + ')');

    var xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, width]);

  var yScale = d3.scaleLinear()
  .domain([0, maxCount])
  .range([height - margin.bottom - margin.top, 0]);

  var xAxis = d3.axisBottom(xScale);
  chartGroup.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
    .call(xAxis);

  var yAxis = d3.axisLeft(yScale);
    chartGroup.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(0, 0)')
  .call(yAxis);

  var line = d3.line()
  .x(function(d){return xScale(d.date);})    
  .y(function(d){return yScale(d.count);})

  chartGroup.append('path')
  .attr('d', line(data))
  .attr('class', 'dataLine');

  // title
  chartGroup.append("text")
  .attr("x", (width / 2))             
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("Number of Posts in October 2018 on UberPeople.net");

  // text label for the x axis
  // adjusted from D3 Axis Label Reference
  chartGroup.append("text")             
  .attr("transform",
          "translate(" + (width/2) + " ," + 
                           (height - margin.top - 10) + ")")
  .style("text-anchor", "middle")
  .text("Days")
  .attr('class' , 'axisLabel');

  // text label for the y axis
  // adjusted from D3 Axis Label Reference
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 20)
  .attr("x",0 - (height / 2) + margin.top)
  .style("text-anchor", "middle")
  .text("Count")
  .attr('class' , 'axisLabel');  
}

d3.csv('data/data.csv', function(d) {
    return {
      date: parseDate(d.date),
      count: +d.count
    };
}).then(lineChart);