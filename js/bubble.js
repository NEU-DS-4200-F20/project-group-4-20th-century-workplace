let width = 450
let height = 450

let data = d3.json('data/keywords.json', function(d) {
    return {
      date: d.keywords,
      count: +d.count
    };
})

console.log(data)

let svg = d3.select("#vis2")
  	.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style('background', '#efefef');

var test = [{ "name": "A" }, { "name": "B" }, { "name": "C" }, 
{ "name": "D" }, { "name": "E" }, { "name": "F" }, 
{ "name": "G" }, { "name": "H" }]

let node = svg.append("g")
  .selectAll("circle")
  .data(test)
  .enter()
  .append("circle")
  	.attr('id', test.name)
    .attr("r", 50)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", "#69b3a2")
    .style("fill-opacity", 0.3)
    .attr("stroke", "#6B97EE")

let text = svg.select("g")
  .selectAll("text")
  .data(test)
  .enter()
  .append("text")
  	.attr("dx", width / 3)
    .attr("dy", height / 2)
  	.text('Test')

// forces features (referenced from Yan Holtz)
let simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.01).radius(60).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(test)
    .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
      text
          .attr("dx", function(d){ return d.x; })
          .attr("dy", function(d){ return d.y; })
    });