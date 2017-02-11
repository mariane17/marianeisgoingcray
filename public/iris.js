

// example 56 constructing DOM elements with D3
// d3.select("string").append(svg) where string is a css element and svg is appended to the string i.e. body
// 
console.log("HELLO D3");
/* example 71
      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }
      
      d3.csv("iris.csv", type, function (data){
        var min = d3.min(data, function (d){ return d.sepal_length; });
        var max = d3.max(data, function (d){ return d.sepal_length; });
        console.log([min, max]);
       //example 72 use extent does same as top
        var extent = d3.extent(data, function (d){ return d.sepal_length; });
        console.log(extent);
      });
*/
/* example 73 basic scatter plot
  var svg = d3.select("body").append("svg")
        .attr("width",  250)
        .attr("height", 250);

      var xScale = d3.scale.linear().range([0, 250]);
      var yScale = d3.scale.linear().range([250, 0]); //example 74 invert range from [0,250] to [250,0]

      function render(data){

        xScale.domain(d3.extent(data, function (d){ return d.sepal_length; })); //computes max, min of sepal_length passes to domain of xscale
        yScale.domain(d3.extent(data, function (d){ return d.petal_length; })); //

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle").attr("r", 10);
        circles
          .attr("cx", function (d){ return xScale(d.sepal_length); })  //this passes the sepal_length as the x value, w/r to the scale
          .attr("cy", function (d){ return yScale(d.petal_length); });

        circles.exit().remove();
      }

      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, render);
	
*/
/*example 75/76
    	var outerWidth = 300; //svg width
      var outerHeight = 250; //svg height
      var circleRadius = 5; //instead of harcoding within code, can change for later i.e.aesthetics
      var xColumn = "sepal_length";
      var yColumn = "petal_length";

      var svg = d3.select("body").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.linear().range([0, outerWidth]);
      var yScale = d3.scale.linear().range([outerHeight, 0]);

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle").attr("r", circleRadius);
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); }) //uses [] notations insteady of d. notation
          .attr("cy", function (d){ return yScale(d[yColumn]); });
        circles.exit().remove();
      }

      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, render);
   */
/*example 76 modifies r for a 3rd column of data set via rColumn variable
     
      var outerWidth = 300;
      var outerHeight = 250;
      var rMin = 5; // "r" stands for radius
      var rMax = 20;
      var xColumn = "sepal_length";
      var yColumn = "petal_length";
      var rColumn = "sepal_width";

      var svg = d3.select("body").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.linear().range([0, outerWidth]);
      var yScale = d3.scale.linear().range([outerHeight, 0]);
      var rScale = d3.scale.linear().range([rMin, rMax]);

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r",  function (d){ return rScale(d[rColumn]); });
        circles.exit().remove();
      }

      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, render);
*/
/*example 80 modifies circles for a 4rd column of data set via color in css
 // this uses a circles css.
 var outerWidth = 300;
      var outerHeight = 250;
      var rMin = 5; // "r" stands for radius
      var rMax = 20;
      var xColumn = "sepal_length";
      var yColumn = "petal_length";
      var rColumn = "sepal_width";
      var colorColumn = "species";

      var svg = d3.select("body").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.linear().range([0, outerWidth]);
      var yScale = d3.scale.linear().range([outerHeight, 0]);
      var rScale = d3.scale.linear().range([rMin, rMax]);
      var colorScale = d3.scale.category10(); //d3 scale that already pics the colors, there are also other color combinations

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx",      function (d){ return     xScale(d[xColumn]);     })
          .attr("cy",      function (d){ return     yScale(d[yColumn]);     })
          .attr("r",       function (d){ return     rScale(d[rColumn]);     })
          .attr("stroke",  function (d){ return colorScale(d[colorColumn]); }); //this is where the magic happens!

        circles.exit().remove();
      }

      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, render);
*/
/*

      var outerWidth = 300;
      var outerHeight = 250;
      var rMin = 1; // "r" stands for radius
      var rMax = 6;
      var xColumn = "sepal_length";
      var yColumn = "petal_length";
      var rColumn = "sepal_width";
      var colorColumn = "species";

      var svg = d3.select("body").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.linear().range([0, outerWidth]);
      var yScale = d3.scale.linear().range([outerHeight, 0]);
      var rScale = d3.scale.linear().range([rMin, rMax]);
      var colorScale = d3.scale.category10();

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx",      function (d){ return       xScale(d[xColumn]);     })
          .attr("cy",      function (d){ return       yScale(d[yColumn]);     })
          .attr("r",       function (d){ return       rScale(d[rColumn]);     })
          .attr("fill",    function (d){ return   colorScale(d[colorColumn]); });

        circles.exit().remove();
      }

      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, render);
*/
//example 106 scatterplot axes and labels
 	  var outerWidth = 300;
      var outerHeight = 250;
      var margin = { left: 60, top: 5, right: 5, bottom: 60 };
      var rMin = 1; // "r" stands for radius
      var rMax = 6;
      var xColumn = "sepal_length";
      var yColumn = "petal_length";
      var rColumn = "sepal_width";
      var colorColumn = "species";

      var xAxisLabelText = "Sepal Length (cm)";
      var xAxisLabelOffset = 48;

      var yAxisLabelText = "Petal Length (cm)";
      var yAxisLabelOffset = 30;

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var svg = d3.select(".box-panel").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);
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

      var xScale = d3.scale.linear().range([0, innerWidth]);
      var yScale = d3.scale.linear().range([innerHeight, 0]);
      var rScale = d3.scale.linear().range([rMin, rMax]);
      var colorScale = d3.scale.category10();

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
        .ticks(5)
        .tickFormat(d3.format("s"))
        .outerTickSize(0);
      var yAxis = d3.svg.axis().scale(yScale).orient("left")
        .ticks(5)
        .tickFormat(d3.format("s"))
        .outerTickSize(0);

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var circles = g.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx",      function (d){ return       xScale(d[xColumn]);     })
          .attr("cy",      function (d){ return       yScale(d[yColumn]);     })
          .attr("r",       function (d){ return       rScale(d[rColumn]);     })
          .attr("fill",    function (d){ return   colorScale(d[colorColumn]); });

        circles.exit().remove();
      }

      function type(d){
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, render);
     