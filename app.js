/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var ibmdb = require('ibm_db');

global.dbConnString = "DATABASE=BLUDB;HOSTNAME=dashdb-entry-yp-dal09-07.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=dash11481;PWD=09ee0b8b23de;"

app.get('/select_scatter',function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
      //var query = "SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE";	//SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE FETCH FIRST 5 ROWS ONLY
      //var query = "SELECT FEATURE_NUMBER, LATITUDE, LONGITUDE, GFLAG, COMMENTS FROM SPSS_OUTPUT_TABLE ORDER BY FEATURE_NUMBER DESC"; //for map only   
      var query = "SELECT * FROM SPSS_OUTPUT_TABLE WHERE FEATURE_NUMBER LIKE 'CLS%' OR FEATURE_NUMBER LIKE 'DMA%' OR INT_EXT = 'External' OR DEPTH____WT_ >= 0.10 OR DEPTH____WT_ IS NOT NULL OR CLUSTER_NUMBER IS NOT NULL";
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 

        var data = rows;
         // console.log(JSON.parse(rows));
        res.end(JSON.stringify(data)); 

      conn.close(function() {
         console.log("**********Connection closed successfully.**********");
         });
        
      });
    });
});

app.get('/select_single_map', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
      //var query = "SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE";	//SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE FETCH FIRST 5 ROWS ONLY
      //var query = "SELECT FEATURE_NUMBER, LATITUDE, LONGITUDE, GFLAG, COMMENTS FROM SPSS_OUTPUT_TABLE ORDER BY FEATURE_NUMBER DESC"; //for map only   
      var query = "SELECT FEATURE_NUMBER, LAT___DEG_DEC_NAD_83_, LONG___DEG_DEC_NAD_83___UTM_ZONE_11_, GFLAG, COMMENTS FROM SPSS_OUTPUT_TABLE WHERE FEATURE_NUMBER IS NOT NULL ORDER BY LAT___DEG_DEC_NAD_83_";
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
        var data = rows;
         // console.log(JSON.parse(rows));
        res.end(JSON.stringify(data)); 
      conn.close(function() {
         console.log("**********Connection closed successfully.**********");
         });
        
      });
    });
});

app.get('/select_flags', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
      var query = "SELECT FEATURE_NUMBER, FEATURE_TYPE, FEATURE_COMMENT, RPR, CORROSION, DENT, COMMENTS FROM SPSS_OUTPUT_TABLE WHERE FEATURE_NUMBER IS NOT NULL AND (FEATURE_NUMBER LIKE 'CLS%' OR FEATURE_NUMBER LIKE 'DMA%' OR FEATURE_NUMBER LIKE 'DNT%') ORDER BY FEATURE_NUMBER";
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
        var data = rows;
         // console.log(JSON.parse(rows));
        res.end(JSON.stringify(data)); 
      conn.close(function() {
         console.log("**********Connection closed successfully.**********");
         });
        
      });
    });
});

app.get('/select_critical_flags_only', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
      var query = "SELECT FEATURE_NUMBER, FEATURE_TYPE, FEATURE_COMMENT, RPR, CORROSION, DENT, COMMENTS FROM SPSS_OUTPUT_TABLE WHERE FEATURE_NUMBER IS NOT NULL AND (FEATURE_NUMBER LIKE 'CLS%' OR FEATURE_NUMBER LIKE 'DMA%' OR FEATURE_NUMBER LIKE 'DNT%') AND (RPR = 1 OR CORROSION = 1 OR DENT = 1) ORDER BY FEATURE_NUMBER";
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
        var data = rows;
         // console.log(JSON.parse(rows));
        res.end(JSON.stringify(data)); 
      conn.close(function() {
         console.log("**********Connection closed successfully.**********");
         });
        
      });
    });
});

app.get('/select_critical_flags_only', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
      var query = "SELECT FEATURE_NUMBER, FEATURE_TYPE, FEATURE_COMMENT, RPR, CORROSION, DENT, COMMENTS FROM SPSS_OUTPUT_TABLE WHERE FEATURE_NUMBER IS NOT NULL AND (FEATURE_NUMBER LIKE 'CLS%' OR FEATURE_NUMBER LIKE 'DMA%' OR FEATURE_NUMBER LIKE 'DNT%') AND (RPR = 1 OR CORROSION = 1 OR DENT = 1) ORDER BY FEATURE_NUMBER";
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
        var data = rows;
         // console.log(JSON.parse(rows));
        res.end(JSON.stringify(data)); 
      conn.close(function() {
         console.log("**********Connection closed successfully.**********");
         });
        
      });
    });
});


app.get('/select_full_map', function(req, res) {
  //get ILITable Names
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
      var query = "SELECT * FROM ILI_NAMES";
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
        var iliTableName = rows;
        //console.log(iliTableName[1]);
        var numTables = rows.length;
	    queryAll(iliTableName, numTables);
         	 conn.close(function() {
	    	     console.log("**********Connection closed successfully.**********");
	  		 });
      });
      
// http://stackoverflow.com/questions/15533905/cannot-response-write-on-connection-node-js      
      function queryAll(tableName, numTables){
      	for (var i = 0; i < numTables; i++) {
        	//console.log('Testing for loop...');
        	console.log(tableName[i].ILI_SECTION_NAME);
        }
/*      var query = "";
      	conn.query(query, function(err, rows) {
      		if (err) {throw err;
      		} else
      		for (var i = 0; i < numTables; i++) {
				query = "SELECT FEATURE_NUMBER, LAT___DEG_DEC_NAD_83_, LONG___DEG_DEC_NAD_83___UTM_ZONE_11_, GFLAG, COMMENTS FROM " + tableName[i] + " WHERE FEATURE_NUMBER IS NOT NULL ORDER BY LAT___DEG_DEC_NAD_83_";			
			        if (err) {
			          console.log("Error: ", err);
			          return;
			        }
			    var data = rows;
				res.write(JSON.stringify(data));
	            conn.close(function() {
			         console.log("**********Connection closed successfully.**********");
  		  		    });
  		  	}
  		  	res.end();
		});
*/		
	  }
	  
	});
  });




app.get('/riskmgt',function(req,res){
res.sendfile('riskmgt.html');
});


