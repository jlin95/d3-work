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

  var colors = d3.scaleOrdinal().domain(["0, B, C, D, E, F, G, H"])
                  .range(["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"]);

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
      .attr("x", -20)
      .attr("y", function (d, i) {
        return i * 23; })
      .style("font-size", 12.5)
      .style("text-anchor", "middle")
      .attr("transform", "translate(-1," + 21 / 1.5 + ")")
      .attr("class", function (d, i) { return "color: #000;"; });

  var legend = svg.selectAll(".legend")
       .data(["A", "B", "C", "D", "E", "F", "G", "H"])//hard coding the labels as the datset may have or may not have but legend should be complete.
       .enter().append("g")
        .attr("x", 20)
        .attr("y", height)
       .attr("class", "legend")
       .attr('transform', function(d, i) { return "translate(" + -50*i + "," + 0 + ")"; })

  legend.append("rect")
       .attr("x", width - 18)
       .attr("width", 18)
       .attr("height", 18)
       .style("fill", function(d){
         return colors(d);
       });

  legend.append("text")
       .attr("x", width - 24)
       .attr("y", 9)
       .attr("dy", ".35em")
       .style("text-anchor", "end")
       .text(function(d) { return d;});

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
             return "ffffcc";
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
