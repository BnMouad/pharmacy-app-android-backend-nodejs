const {Connection} = require ('./connection');
const signup = require('./signup');


/*signup(11053,"mouad","hello","heredress",213777875776)*/
  



  


// Rest service getting all the users
Connection.app.get("/getusers", function(req, res) {
  var query = "select * from users ";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

