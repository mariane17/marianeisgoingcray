/* source: http://stackoverflow.com/questions/33856687/append-an-svg-element-to-html-table-cell-using-d3-js
*/

console.log('THIS IS FLAGTABLE2.JS');

var url = "https://marianeisgoingcray.mybluemix.net/select_flags";

    function evalColor(d) {
      if (d === 0 | d == 1 ) {
        return createSVG(d);
      }
      if (d !== 0 | d !== 1 ) {
        return d;
      }
    }

    function evalText(d) {
      if (d === 0 | d == 1 ) {
        console.log(d);
      } else if (d !== 0 | d !== 1 ) {
        return d;
      }
    }

    
d3.json(url, function (error, data) {

      var div = d3.select('.boxflags-panel');

      // append a table to the div
      var table = div.append("table");


      // append a header to the table
      var thead = table.append("th");
 

      // append a body to the table
      var tbody = table.append("tb");


      // append a row to the header
      var theadRow = thead.append("tr");

      // return a selection of cell elements in the header row
      // attribute (join) data to the selection
      // update (enter) the selection with nodes that have data
      // append the cell elements to the header row
      // return the text string for each item in the data array
/*      theadRow.selectAll("th")
        .data(d3.keys(data[0]))
        .enter()
        .append("th")
        .text(function(d) {
          return d;
        });
*/

	  theadRow.selectAll("th")
        .data(d3.keys(data[0]))
        .enter()
        .append("th")
         .text(function(d) { return d; });
		    
      // table body rows
      var tableBodyRows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

      //table body row cells
      tableBodyRows.selectAll("td")
        .data(function(d) {
          return d3.values(d);
        })
        .enter()
        .append("td")
        .text(function(d) {
          return evalText(d);
        })
        .filter(function(d){
          return d === 0 || d === 1;
        })
        .append(function(d) {
        	console.log(d);
          return createSVG(d);
        });
        
    function createSVG(d) {
      
      function colorPicker(value) {
        if (value === 0 ) {
          return "#7aa25c";
        } else if (value === 1) {
          return "#d84b2a";
        }
      }

      function colorFill(value) {
        if (value === 0) {
          return "#fff";
        } else if (value === 1) {
          return "#fff";
        }
      }

      function letterChoice(value) {
        if (value === 0) {
          return "OK";
        } else if (value === 1) {
          return "BAD";
        }
      }

      var w = 50;
      var h = 50;

      var kpi = document.createElement("div");

      var svg = d3.select(kpi).append("svg")
        .attr({
          width: w,
          height: h
        });
        
      var elem = svg.selectAll("div")
        .data([d]);

      var elemEnter = elem.enter()
        .append("g");

      elemEnter.append("circle")
        .attr({
          cx: 28,
          cy: 25,
          r: 20
        })
        .style("fill", colorPicker);

      elemEnter.append("text")
        .style("fill", colorFill)
        .attr("dy", 30)
        .attr("dx", 25)
        .text(letterChoice);

      return kpi;
    }

    return table;
});