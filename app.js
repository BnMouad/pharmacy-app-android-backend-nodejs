const {Connection} = require ('./connection');
const signup = require('./signup');
const login = require('./login')
const Pharmacy = require('./pharmacy')
const Order = require('./orders')
// globale variable for to check the authentification
global.isLoggedIn=false; 

// get all the user 
Connection.app.get("/api/getusers", function(req, res) {
  var query = "select * from users ";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});
// get a specific user with an id 
Connection.app.get('/api/getuser/:id',function(req,res){  
  var query = "select * from users where numero_social ='"+req.params.id+"'";
  Connection.connection.query(query,function(error,results){
  if (error) throw error;
  res.send(JSON.stringify(results[0]));
  })
});
// signup 
Connection.app.post("/api/signup", function(req, res) {
  signup.addUser(req.body.numero_social,req.body.nom,req.body.prenom,req.body.adresse,req.body.telephone,(results)=>{
    res.send(results)
  })
  
});
//login 
Connection.app.post("/api/login", function(req, res) {
  login.login(req.body.telephone,req.body.password,(loginResponse)=>{
    res.send(loginResponse);
  })
});
//logout
Connection.app.get("/api/logout", function(req, res) {
  if(isLoggedIn) {
    isLoggedIn =false ; 
    res.send({
      message: "logged out"
    })
  }else{
    // change it later to something else 
    res.redirect('/')
  }
});
//update passowrd 
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
// get all pharmacies 
Connection.app.get('/api/getAllPharmacies',function(req,res){  
  Pharmacy.getAllPharmacies((results)=>{
    res.send(results)
  })
});
// get pharmacies by wilaya
Connection.app.get('/api/getPharmaciesByWilaya/:WilayaId',function(req,res){  
  Pharmacy.getPharmaciesByWilaya(req.params.WilayaId,(results)=>{
    res.send(results)
  })
});
// get pharmacy details 
Connection.app.get('/api/getpharmacy/:id',function(req,res){  
  Pharmacy.getPharmacy(req.params.id,(results)=>{
    res.send(results)
  })
});
// get a nearby pharmacy 
Connection.app.get('/api/getNearByPharmacies/:lat/:lng',function(req,res){ 
  Pharmacy.getNearByPharmacies(req.params.lat,req.params.lng,(results)=>{
    res.send(results);
  });
});
//get all orders of a user 
Connection.app.get('/api/getAllOrdersOfUser/:id',function(req,res){ 
  Order.getAllOrdersOfUser(req.params.id,(results)=>{
    res.send(results);
  });
});
// create an order 
Connection.app.post("/api/createOrder", function(req, res) {
  Order.creatOrder(req.body.user_id,req.body.pharmacy_id,(results)=>{
    res.send(results)
  })
});