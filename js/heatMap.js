d3.json("data/git-commit-frequency.json", function(data) {
  let margin = {
    top: 20,
    right: 85,
    bottom: 30,
    left: 40
  }

  let width = (21 + 1) * data.length;
  let height = (21 + 1) * 7;
  let daysInWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  let colors = d3.scaleOrdinal().domain(["0", "1", "2", "3", "4", "5", "6", "7"])
                    .range(["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"]);

  let x = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  let y = d3.scaleLinear()
    .domain([0, 7])
    .rangeRound([height, 0]);

  let svg = d3.select("#heat-map")
    .attr("width", width + 100)
    .attr("height", height),
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let dayLabels = svg.selectAll(".dayLabel")
    .data(daysInWeek)
    .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", -20)
      .attr("y", function (d, i) {
        return i * 23; })
      .style("font-size", 12.5)
      .style("text-anchor", "middle")
      .attr("transform", "translate(0," + 21 / 1.5 + ")")
      .attr("class", function (d, i) { return "color: #000;"; });

  let legend = svg.selectAll(".legend")
     .data(["0", "1", "2", "3", "4", "5", "6", "7"])
     .enter().append("g")
     .attr("x", 30)
     .attr("font-size", 12)
     .attr("class", "legend")
     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
       .attr("x", width + 40)
       .attr("width", 25)
       .attr("height", 14)
       .style("fill", function(d){return colors(d)});

  legend.append("text")
       .attr("x", width + 30)
       .attr("y", 9)
       .attr("dy", ".35em")
       .style("text-anchor", "end")
       .text(function(d) { return d;});


  // describes the row generated according to the days of the week
  let rows = svg.selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function(d, i){
    	return "translate(" + x(i) + ", -20" + ")"
  })

  // describces cell properties for individual value in the week
  let cell = rows.selectAll("rect")
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
