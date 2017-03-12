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

app.get('/select', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
   								// '+ilisection+'
      var query = "SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE";	//SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE FETCH FIRST 5 ROWS ONLY
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
        var data = rows;
          //console.log(JSON.parse(rows));
          res.end(JSON.stringify(data));
         
      conn.close(function() {
         console.log("**********Connection closed successfully.**********");
         });
        
      });
    });
  });

app.post('/ilisection_post', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } else {
      var iliSectionName = req.body.ilisection;
      var query = "SELECT ABSOLUTE_ODOMETER_m, MAX_DEPTH_PCT FROM " + iliSectionName;
      console.log("iliSectionName: " + iliSectionName);
      console.log("query: " + query);
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } else {
        	var data = rows;
          res.send(data);
          conn.close(function() {
            console.log("Connection closed successfully.");
          });
        }
      });
    }
  });
});


app.get('/riskmgt',function(req,res){
res.sendfile('riskmgt.html');
});



