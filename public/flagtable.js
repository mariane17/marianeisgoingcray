/* source: http://bl.ocks.org/jfreels/6734025*/
console.log('RUNNING FLAGTABLE.JS');

var url = "https://marianeisgoingcray.mybluemix.net/select_flags";

d3.json(url, function (error,data) {

  function tabulate(data, columns) {
        var table = d3.select('.boxflags-panel').append('table');
        var thead = table.append('thead');
        var tbody = table.append('tbody');

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
			.enter()
			.append('td')
			.text(function (d) { if (d.value !== 1 && d.value !== 0) return d.value;});
			
			// add the imges when the value is 0 or 1
			cells.filter(function(d) { return (d.value === 1 || d.value ===0); })
			.append('img')
			.attr("src", function(d) {
			      return d.value===1 ? "images/error.png":"images/success.png";
			});      

      return table;
    }
    // render the table(s)
    tabulate(data, ['FEATURE_NUMBER', 'FEATURE_TYPE', 'FEATURE_COMMENT', 'RPR', 'CORROSION', 'DENT', 'COMMENTS']); // 5 column table


}); 