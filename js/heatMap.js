d3.json("data/git-commit-frequency.json", function(data) {
  var margin = {
    top: 20,
    right: 85,
    bottom: 30,
    left: 40
  }
  var width = (21 + 1) * data.length;
  var height = (21 + 1) * 7;
  var colors = [ "#ffffcc", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32"];
  var daysInWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];


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

  var dayLabels = svg.selectAll(".dayLabel")
    .data(daysInWeek)
    .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", 0)
      .attr("y", function (d, i) { return i * 21; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + 21 / 1.5 + ")")
      .attr("class", function (d, i) { return "fill: #000;"; });

  var rows = svg.selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function(d, i){
    	return "translate(" + x(i) + ", -20" + ")"
  })

  var box = rows.selectAll("rect")
  	.data(function(d, i) {
      return d.days; // this returns every day array (of length 7 values)
    })
  	.enter()
  	.append("rect")
		.attr("y", function(d, i) {
      return y(i);
    })
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", function (d) {
      switch(d) {
        case 0:
             return "#ffffcc";
             break;
         case 1:
             return "ffeda0";
             break;
         case 2:
             return "fed976";
             break;
         case 3:
             return "feb24c";
             break;
         case 4:
             return "fd8d3c";
             break;
         case 5:
             return "fc4e2a";
             break;
         case 6:
             return "e31a1c";
             break;
         case 7:
             return "b10026";
             break;
        }
    })
    .attr("class", "bordered");

});
