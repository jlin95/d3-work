var margin = {
  top: 20,
  right: 85,
  bottom: 30,
  left: 40
}

var svg = d3.select("#bar-chart"),
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    // colors in asecnding age group
    .range(["#e5e5b7", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84"]);

d3.csv("data/online-shoppers-by-age-group.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var ageGroups = data.columns.slice(1);

  x0.domain(data.map(function(d) { return d.year; }));
  x1.domain(ageGroups).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) {
    return d3.max(ageGroups, function(key) {
      return d[key]; }
    ); })
  ]).nice();

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return ageGroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      .on("mouseover", function() {
        return tooltip.style("display", null);
      })
      .on("mouseout", function() {
        return tooltip.style("display", "none");
      })
      .on("mousemove", function(d) {
        return tooltip.style("top", (d3.event.pageY - 75) + "px")
                      .style("left", (d3.event.pageX - 16) + "px")
                      .style("border", "solid 2px")
                      .style("border-color", d3.select(this).style("fill"))
                      .select("text").text("Ages " + "\n" + d.key + " = " + d.value + "%");
      });

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 10)
      .attr("y", y(y.ticks().pop()) - 13)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Percentage (%)");

  var legend = g.append("g")
      .attr("font-size", 12.5)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(ageGroups.slice().reverse())
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 26)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 32)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});

var tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("border-radius", "8px")
  .style("font-size", "12px")
  .style("background-color", "white")
  .style("padding", "5px");


tooltip.append("rect")
  .attr("width", 80)
  .attr("height", 20)
  .style("opacity", 1);

tooltip.append("text")
  .attr("x", 30)
  .attr("dy", "1.2em");
