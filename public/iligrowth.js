console.log('THIS IS ILIGROWTH.JS')	  
	  
	  var outerWidth = 900;
      var outerHeight = 400;
      var border = 1;
      var bordercolor = 'black';
      var margin = { left: 60, top: 5, right: 5, bottom: 60 };
      //var rMin = 1; // "r" stands for radius
      //var rMax = 6;
      //var xColumn = "ABSOLUTE_ODOMETER_m";
      //var yColumn = "MAX_DEPTH_PCT";
     //var rColumn = "sepal_width";
     //var colorColumn = "species";

      var xAxisLabelText = "Absolute Distance (m)";
      var xAxisLabelOffset = 48;

      var yAxisLabelText = "Peak Depth (%)";
      var yAxisLabelOffset = 42;

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var svg = d3.select(".box-panel-growth").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .attr("border",border);
      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")")
      var xAxisLabel = xAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("x", innerWidth / 2)
        .attr("y", xAxisLabelOffset)
        .attr("class", "label")
        .text(xAxisLabelText);
      var yAxisG = g.append("g")
        .attr("class", "y axis");
      var yAxisLabel = yAxisG.append("text")
        .style("text-anchor", "middle") //centers label
        .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)") //slightly moves labels
        .attr("class", "label")//in css, changes font size
        .text(yAxisLabelText);

	  var borderPath = svg.append("rect")
       			.attr("x", 0)
       			.attr("y", 0)
       			.attr("height", outerHeight)
       			.attr("width", outerWidth)
       			.style("stroke", bordercolor)
       			.style("fill", "none")
       			.style("stroke-width", border);


      var xScale = d3.scale.linear().range([0, innerWidth]);
      var yScale = d3.scale.linear().range([innerHeight, 0]);
 //     var rScale = d3.scale.linear().range([rMin, rMax]);
 //     var colorScale = d3.scale.category10();

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
        .ticks(5)
        .tickFormat(d3.format("r"))
        .outerTickSize(0);
      var yAxis = d3.svg.axis().scale(yScale).orient("left")
        .ticks(5)
        .tickFormat(d3.format(".0%"))
        .outerTickSize(0);

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d.ABSOLUTE_ODOMETER_m; }));
        yScale.domain(d3.extent(data, function (d){ return d.MAX_DEPTH_PCT; }));
   //   rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var circles = g.selectAll("circle").data(data);
        circles.enter().append("circle").attr("r", 2);
        circles
          .attr("cx", function (d){ return xScale(d.ABSOLUTE_ODOMETER_m);})
          .attr("cy", function (d){ return yScale(d.MAX_DEPTH_PCT);})
         // .attr("r",       function (d){ return       rScale(d[rColumn]);     })
         // .attr("fill",    function (d){ return   colorScale(d[colorColumn]); });

        circles.exit().remove();
      }

      function type(d){
        d.ABSOLUTE_ODOMETER_m = +d.ABSOLUTE_ODOMETER_m; //x
        //d.sepal_width  = +d.sepal_width; 
        d.MAX_DEPTH_PCT = +d.MAX_DEPTH_PCT; //y
       // d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("ILI_Data_Sample.csv", type, render);
      
