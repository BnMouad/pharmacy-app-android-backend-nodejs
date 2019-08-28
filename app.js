var express = require("express");
var mysql = require("mysql");
var app = express();
app.use(express.static("public"));
var bodyparser = require("body-parser");
app.use(bodyparser.json());

//database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pharma_db"
});
connection.connect();

// Server creation
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
});
console.log("Node server running on port 3000");

// Rest service getting all the users
app.get("/getusers", function(req, res) {
  var query = "select * from users ";
  connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});
