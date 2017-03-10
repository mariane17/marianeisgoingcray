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
var router = express.Router();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var ibmdb = require('ibm_db');
var ilisection = '';

global.dbConnString = "DATABASE=BLUDB;HOSTNAME=dashdb-entry-yp-dal09-07.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=dash11481;PWD=09ee0b8b23de;"

app.get('/select', function(req, res) {
  ibmdb.open(dbConnString, function(err, conn) {
    if (err) {
      console.error("Error: ", err);
      return;
    } 
   	console.log("**********CONNECTING TO DATABASE**********");
   	
      var query = "SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM '+ilisection+'";	//SELECT MAX_DEPTH_PCT, \"ABSOLUTE_ODOMETER_m\" FROM CAPSTONE_ILI_DATA_SAMPLE FETCH FIRST 5 ROWS ONLY
      conn.query(query, function(err, rows) {
        if (err) {
          console.log("Error: ", err);
          return;
        } 
          //console.log(JSON.parse(rows));
          res.end(JSON.stringify(rows));
         
         conn.close(function() {
            console.log("Connection closed successfully.");
          });
        
      });
    });
  });

 
app.post('/', function (req,res){
	ilisection = req.body.ilisection;
	console.log(ilisection);
	res.render('index.html');
})


app.get('/riskmgt',function(req,res){
res.sendfile('riskmgt.html');
});



