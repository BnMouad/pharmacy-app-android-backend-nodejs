const {Connection} = require ('./connection');
const signup = require('./signup');



// Rest service getting all the users
Connection.app.get("/api/getusers", function(req, res) {
  var query = "select * from users ";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});



Connection.app.post("/api/signup", function(req, res) {

  signup.addUser(req.body.nemuro_social,req.body.nom,req.body.prenom,req.body.adresse,req.body.telephone)
  res.send("user added");
  res.send(JSON.stringify(req.body));
});

Connection.app.post("/api/updatePassword", function(req, res) {
  
  if(req.body.password===req.body.c_password){
    signup.updatePassword(req.body.user_id,req.body.password)
    res.send("password updated");
    res.send(JSON.stringify(req.body));
  } else {
    return res.status(400).send({
      message: 'passwords dont match',
      status: 400
   });
  }
  
});

