/* source: http://bl.ocks.org/jfreels/6734025*/

var url = "https://marianeisgoingcray.mybluemix.net/select_flags";
d3.json(url, function (error,data) {

  function tabulate(data, columns) {
		var table = d3.select('.boxflags-panel').append('table')
		var thead = table.append('thead')
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

		// set variables for check and x images
		var noFlag = 'OK';
		var yesFlag = 'NOT OK';

//      .data(data.filter(function(d){ return d.DEPTH >=  0.1; }))

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		 // .data(function (row) {
		 //   return columns.map(function (column) {
		 //     return {column: column, value: row[column]};
		   .data(data.filter(function(row){
		      return columns.map(function (column) {
		      	return {column: column, value: row[column]};
	   		});
	   	}))	   
		   
		  .enter()
		  .append('td')
		  //.text(function (d) { console.log(d.value); return d.value; });
		  .text(function (d) { if (d.value == 0) {  
		    		return noFlag;
		    	} else if (d.value == 1){
				return yesFlag;
			}		    	
	  			return d.value;		 	
		});
		return table;
	}	




	// render the table(s)
	tabulate(data, ['FEATURE_NUMBER', 'RPR', 'CORROSION', 'DENT', 'COMMENTS']); // 5 column table

});

/*		    .text(function (d) {
			    	for (i=1, i++, i < 4) {
				    	if (d.value[i]] == 0) {
				    		return img
				    	} else if (d.value[i] == 1 {)
							return img
						}		    	
				    	return d.value; 
				    }
		    	});
	*/