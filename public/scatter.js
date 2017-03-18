console.log('THIS IS SCATTER.JS');
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = function(d) { return d.DISTANCE;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom")
			.ticks(5)
	        .tickFormat(d3.format("r"))
	        .outerTickSize(0);
// setup y
var yValue = function(d) { return d.DEPTH;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left")
			.ticks(5)
	        .tickFormat(d3.format(".0%"))
	        .outerTickSize(0);

// setup fill color
//var cValue = function(d) { return d.Manufacturer;},
   // color = d3.scale.category10();

// add the graph canvas to the body of the webpage
var svg = d3.select(".boxscatter-panel").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("boxscatter-panel").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
var url = "https://marianeisgoingcray.mybluemix.net/select_scatter";	
d3.json(url, function(error, data) {

// parse json
         data.forEach(function(d) {
        	d.DISTANCE = +d.DISTANCE__M_; //x
        	d.DEPTH = +d.DEPTH____WT_; //y
        });


  // don't want dots overlapping axis, so add in buffer to data domain
  //xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  //yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
    xScale.domain(d3.extent(data, xValue));
    yScale.domain(d3.extent(data, yValue));

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
   //   .ticks(5)
   //   .tickFormat(d3.format("r"))
   //   .outerTickSize(0)
    .append("text")
      .attr("class", "label")	 // x-axis label
      .attr("x", width)
      .attr("y", 15)
      .style("text-anchor", "end")
      .text("DISTANCE (m)");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
  //    .ticks(5)
  //    .tickFormat(d3.format(".0%"))
  //    .outerTickSize(0)
    .append("text")		// y-axis label
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -15)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("DEPTH");

  // draw dots
  svg.selectAll(".dot")
      .data(data.filter(function(d){ return d.DEPTH >=  0.1; }))
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
 //     .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["FEATURE_NUMBER"] + "<br/> (" + xValue(d)
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 0);
      });
/*
  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
*/
});