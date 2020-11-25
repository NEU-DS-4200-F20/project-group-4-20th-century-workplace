var dispatcher = d3.dispatch('selection')

d3.json("data/main.json").then(data => {

  // graph sizes
  let width = 700
  let height = 700

  // add svg to vis2
  let svg = d3.select("#vis3")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style('background', '#efefef');

  // title
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 50)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("text-decoration", "underline")
  .text("Most Common Keyword Links on UberPeople.net");

  // all the lines
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
  // all the node objects
  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
  // all the circles in the node  
  var circles = node.append("circle")
      .attr('id', d => d.id)
      .attr("r", 10)
      .attr("fill", function(d) { 
        if (d.group == "root") {
          return "#69b3a2"
        }
        else {
          return "#bc6bee"
        }
      })
  // text labels of nodes
  var labels = node.append("text")
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.id; });

  // force simulation to push the nodes and links apart
  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation
      .nodes(data.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(data.links);

  // on tick function
  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
  }
  
  dispatcher.on('selection', function(d) {
    console.log('hello world')
});

});
