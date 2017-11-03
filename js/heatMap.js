d3.json("data/git-commit-frequency.json", function(data) {
  var margin = {
    top: 20,
    right: 85,
    bottom: 30,
    left: 40
  }
  var width = (21 + 1) * data.length;
  var height = (21 + 1) * 7;
  var colors = [ "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61","#f46d43", "#d73027"];

  var x = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, 7])
    .rangeRound([height, 0]);

  var svg = d3.select("#heat-map")
    .attr("width", width)
    .attr("height", height),
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var rows = svg.selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function(d, i){
    	return "translate(" + x(i) + ", -20" + ")"
  })

  var box = rows.selectAll("rect")
  	.data(function(d, i){
      console.log(d.days);
      return d.days;
    })
  	.enter()
  	.append("rect")
		.attr("y", function(d, i) {
      return y(i);
    })
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", 'green')
    .attr("class", "bordered");

});
