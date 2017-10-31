var margin = {
  top: 20,
  right: 85,
  bottom: 30,
  left: 40
}

var gridSize = 30;

var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
