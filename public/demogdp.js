console.log("this is demo 2 of d3");
/*example 82
  var outerWidth = 300;
      var outerHeight = 250;
      var circleRadius = 2;
      var xColumn = "population";
      var yColumn = "gdp";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.linear().range([0, outerWidth]);
      var yScale = d3.scale.linear().range([outerHeight, 0]);

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r", circleRadius);

        circles.exit().remove();
      }

      function type(d){
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }
*/
/* example 83 logarthmic scale (spaces out points)

      var outerWidth = 300;
      var outerHeight = 250;
      var circleRadius = 2;
      var xColumn = "population";
      var yColumn = "gdp";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.log().range([0, outerWidth]); //instead of d3.scale.linear() it is now .log()
      var yScale = d3.scale.log().range([outerHeight, 0]);

      function render(data){
        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r", circleRadius);

        circles.exit().remove();
      }

      function type(d){
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }
*/
/* example 84 adds another column (population) and differentiates it by size var <r>
      var outerWidth = 300;
      var outerHeight = 250;
      var rMin = 1; // "r" stands for radius
      var rMax = 6;
      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.log().range([0, outerWidth]);
      var yScale = d3.scale.log().range([outerHeight, 0]);
      var rScale = d3.scale.log().range([rMin, rMax]); //example 85 changed d3.scale.linear() to .log() to better visualize 

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
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }
*/
/*example 86 population by sqrt size "how many people per pixel?"
var outerWidth = 300;
      var outerHeight = 250;
      var rMin = 1; // "r" stands for radius even though country has 0 people, it shows 1 therefore next example
      var rMax = 6;
      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.log().range([0, outerWidth]);
      var yScale = d3.scale.log().range([outerHeight, 0]);
      var rScale = d3.scale.sqrt().range([rMin, rMax]); //SQRT SCALE HERE

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
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }
      */
     
/*EXAMPLE 87 poulation true to size
      var outerWidth = 300;
      var outerHeight = 250;
      var rMin = 0; // "r" stands for radius
      var rMax = 20;
      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var xScale = d3.scale.log().range([0, outerWidth]);
      var yScale = d3.scale.log().range([outerHeight, 0]);
      var rScale = d3.scale.sqrt().range([rMin, rMax]);

      function render(data){

        xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]); //instead of using extent

        var circles = svg.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r",  function (d){ return rScale(d[rColumn]); });
        circles.exit().remove();
      }

      function type(d){
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }

      d3.csv("GDP.csv", type, function(data){
        render(data);
      
        // The population in the biggest circle.
        var people = rScale.domain()[1];

        // The number of pixels in the biggest circle, in pixels.
        var pixels = Math.PI * rMax * rMax;

        console.log((people / pixels) + " people per pixel.");
      });
*/
/* example 88 innerWidth and innerHeight (defining inside of the svg)

      var outerWidth  = 300;
      var outerHeight = 250;
      var innerWidth  = outerWidth - 30 -30; //the first 30 is the margin on the left and the second 30 is the margin on the right
      var innerHeight = outerHeight - 30 -30;
      var rMin = 0; // "r" stands for radius
      var rMax = 20;
      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var g = svg.append("g") //example 89g is the group within svg
        .attr("transform", "translate(30, 30)");

      var xScale = d3.scale.log().range([0, innerWidth]);
      var yScale = d3.scale.log().range([innerHeight, 0]);
      var rScale = d3.scale.sqrt().range([rMin, rMax]);

      function render(data){

        xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

        var circles = g.selectAll("circle").data(data); //this was changed fromsvg.selectAll() to g.selectAll()
        												// this means it will append circles to the g element and not the svg
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r",  function (d){ return rScale(d[rColumn]); });
        circles.exit().remove();
      }

      function type(d){
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }

      d3.csv("GDP.csv", type, render);
*/
/*example 91, creates margin variables
 var outerWidth  = 300;
      var outerHeight = 250;

      var marginLeft   = 30;
      var marginTop    = 30;
      var marginRight  = 30;
      var marginBottom = 30;


      var innerWidth  = outerWidth  - marginLeft - marginRight;
      var innerHeight = outerHeight - marginTop  - marginBottom;
      var rMin = 0; // "r" stands for radius
      var rMax = 20;
      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var g = svg.append("g")
        .attr("transform", "translate(" + marginLeft + "," + marginTop + ")"); //instead of harcoded

      var xScale = d3.scale.log().range([0, innerWidth]);
      var yScale = d3.scale.log().range([innerHeight, 0]);
      var rScale = d3.scale.sqrt().range([rMin, rMax]);

      function render(data){

        xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

        var circles = g.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r",  function (d){ return rScale(d[rColumn]); });
        circles.exit().remove();
      }
*/
/* example 92 creates a margin object variable note: margin.left instead of marginLeft
var outerWidth  = 300;
      var outerHeight = 250;

      var margin = { left: 30, top: 30, right: 30, bottom: 30 };

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;
      var rMin = 0; // "r" stands for radius
      var rMax = 20;
      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xScale = d3.scale.log().range([0, innerWidth]);
      var yScale = d3.scale.log().range([innerHeight, 0]);
      var rScale = d3.scale.sqrt().range([rMin, rMax]);

      function render(data){

        xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

        var circles = g.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r",  function (d){ return rScale(d[rColumn]); });
        circles.exit().remove();
      }
      */
     
     //example93 with example 103 for axes
      var outerWidth  = 300;
      var outerHeight = 250;
      var margin = { left: 30, top: 30, right: 30, bottom: 30 };

      var xColumn = "population";
      var yColumn = "gdp";
      var rColumn = "population";
      var peoplePerPixel = 1000000;

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     /* var xAxisG = g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")");
      var yAxisG = g.append("g");*/
     // group elements need to be appended to exisiting group
      var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")"); //translate () brings x-axis to the bottom
      var yAxisG = g.append("g")
        .attr("class", "y axis");

      var xScale = d3.scale.log().range([0, innerWidth]);
      var yScale = d3.scale.log().range([innerHeight, 0]);
      var rScale = d3.scale.sqrt();
      var xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //sets the scale of the axis, orient is where the text is places
      var yAxis = d3.svg.axis().scale(yScale).orient("left");

      function render(data){

        xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
        rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

        xAxisG.call(xAxis); //groupvar.call(insidevar) how to apply insidevar function applies to groupvar
        yAxisG.call(yAxis);

        // Compute the size of the biggest circle as a function of peoplePerPixel.
        var peopleMax = rScale.domain()[1];
        var rMin = 0;
        var rMax = Math.sqrt(peopleMax / (peoplePerPixel * Math.PI));
        rScale.range([rMin, rMax]);

        var circles = g.selectAll("circle").data(data);
        circles.enter().append("circle");
        circles
          .attr("cx", function (d){ return xScale(d[xColumn]); })
          .attr("cy", function (d){ return yScale(d[yColumn]); })
          .attr("r",  function (d){ return rScale(d[rColumn]); });
        circles.exit().remove();
      }
      
      function type(d){
        d.population = +d.population;
        d.gdp        = +d.gdp;
        return d;
      }

      d3.csv("GDP.csv", type, render);



