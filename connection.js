class Connection{

} 
var express = require("express");
var mysql = require("mysql");
Connection.app = express();

Connection.app.use(express.static("public"));
var bodyparser = require("body-parser");
Connection.app.use(bodyparser.json());
Connection.app.use(bodyparser.urlencoded());

//database connection
Connection.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pharma_db"
});


Connection.connection.connect();

// Server creation
server = Connection.app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
});
console.log("Node server running on port 3000")
module.exports={Connection}


