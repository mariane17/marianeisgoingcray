/* source: http://bl.ocks.org/jfreels/6734025*/
console.log('THIS IS FLAGTABLE.JS');

var url = "https://marianeisgoingcray.mybluemix.net/select_flags";

 /*   function evalColor(d) {
      if (d == 0 | d == 1) {
        return createSVG(d);
      }
      if (d != 0 | d != 1) {
        return d;
      }
    }
*/

/*    function evalText(d) {
      if (d == 0) {
      	return "OK!";
      	}else if (d == 1){
      	return "NOT OK";
      } 
        return d;
      }
*/

function addCheck() {
    var img = document.createElement('img');
    img.src = "images/success.png";
    document.body.appendChild(img);
}

function addX() {
    var img = document.createElement('img');
    img.src = "images/error.png";
    document.body.appendChild(img);
}

d3.json(url, function (error,data) {

  function tabulate(data, columns) {
		var table = d3.select('.boxflags-panel').append('table');
		var thead = table.append('thead');
		var	tbody = table.append('tbody');

		// append the header row
		thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
		    .text(function (column) { return column; });

		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
		    return columns.map(function (column) {
		      return {column: column, value: row[column]};
		    });
		  })
		  /*.data(function(d) { return d3.values(d);})*/
		  .enter()
		  .append('td')
		    .text(function (d) {
		    	if (d.value === 0) {
		    		return "OK";
		    		//return addCheck();
		    	} else if (d.value === 1){
					return "NOT OK";
				}	return d.value;		 	
				});
				
	  return table;
	}
	// render the table(s)
	tabulate(data, ['FEATURE_NUMBER', 'FEATURE_TYPE', 'FEATURE_COMMENT', 'RPR', 'CORROSION', 'DENT', 'COMMENTS']); // 5 column table

});	