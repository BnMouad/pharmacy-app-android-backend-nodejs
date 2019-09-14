const { Connection } = require("./connection");
const signup = require("./signup");
const login = require("./login");
const Pharmacy = require("./pharmacy");
const Order = require("./orders");
// globale variable for to check the authentification
global.isLoggedIn = false;

// get all the user
Connection.app.get("/api/getusers", function(req, res) {
  var query = "select * from users ";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});
/*
// get current user 
Connection.app.get("/api/isLoggedIn", function(req, res) {
  
  if (isLoggedIn){
    res.send({
      
    });
  }else{

    
    res.send({

    });


  }

});*/

// get a specific user with an id
Connection.app.get("/api/getuser/:id", function(req, res) {
  var query =
    "select * from users where numero_social ='" + req.params.id + "'";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results[0]));
  });
});
// signup
Connection.app.post("/api/signup", function(req, res) {
  signup.addUser(
    req.body.numero_social,
    req.body.nom,
    req.body.prenom,
    req.body.adresse,
    req.body.telephone,
    results => {
      res.send(results);
    }
  );
});
//login
Connection.app.post("/api/login", function(req, res) {
  login.login(req.body.telephone, req.body.password, loginResponse => {
    res.send(loginResponse);
  });
});
//logout
Connection.app.get("/api/logout", function(req, res) {
  console.log("hello some one visited me ");
  if (isLoggedIn) {
    isLoggedIn = false;
    res.send({
      status: 200,
      message: "logged out"
    });
  } else {
    // change it later to something else
    res.send({
      status: 201, // my status for u r not logged in to log out
      message: "you can access cuase your not logged in"
    });
  }
});
//update passowrd
Connection.app.post("/api/updatePassword", function(req, res) {
  if (req.body.password === req.body.c_password) {
    signup.updatePassword(req.body.user_id, req.body.password);
    res.status(200).send({
      message: "password updated",
      status: 200
    });
  } else {
    res.status(200).send({
      message: "passwords dont match",
      status: 400
    });
  }
});
//get all wilayas
Connection.app.get("/api/getwilayas", function(req, res) {
  var query = "select * from wilayas ";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// get all pharmacies
Connection.app.get("/api/getAllPharmacies", function(req, res) {
  Pharmacy.getAllPharmacies(results => {
    res.send(results);
  });
});
// get pharmacies by wilaya
Connection.app.get("/api/getPharmaciesByWilaya/:WilayaId", function(req, res) {
  Pharmacy.getPharmaciesByWilaya(req.params.WilayaId, results => {
    res.send(results);
  });
});
// get pharmacy details
Connection.app.get("/api/getpharmacy/:id", function(req, res) {
  Pharmacy.getPharmacy(req.params.id, results => {
    res.send(results);
  });
});
// get a nearby pharmacy
Connection.app.get("/api/getNearByPharmacies/:lat/:lng", function(req, res) {
  Pharmacy.getNearByPharmacies(req.params.lat, req.params.lng, results => {
    res.send(results);
  });
});

//get all orders of a user
Connection.app.get("/api/getAllOrdersOfUser/:id", function(req, res) {
  Order.getAllOrdersOfUser(req.params.id, results => {
    res.send(results);
  });
});

//get all orders of a user with the name of pharmacies
Connection.app.get("/api/getOrdersByUser/:idUser", function(req, res) {
  Order.getOrdersByUser(req.params.idUser, results => {
    res.send(results);
  });
});

// create an order
Connection.app.post("/api/createOrder", function(req, res) {
  Order.creatOrder(
    req.body.user_id,
    req.body.pharmacy_id,
    req.body.image_path,
    results => {
      res.send(results);
    }
  );
});

//uploading image
var express = require("express");
var multer = require("multer");
var fileType = require("file-type");
var router2 = express.Router();
var fs = require("fs");

const upload = multer({
  dest: "images/",
  limits: { fileSize: 1000000000, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return callback(new Error("Only Images are allowed !"), false);
    }

    callback(null, true);
  }
}).single("image");

// uploading image
router2.post("/images/upload", (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      let path = `/images/${req.file.filename}`;
      res
        .status(200)
        .json({ message: "Image Uploaded Successfully !", path: path });
    }
  });
});

//getting an image from server by name
router2.get("/images/:imagename", (req, res) => {
  let imagename = req.params.imagename;
  let imagepath = __dirname + "/images/" + imagename;
  let image = fs.readFileSync(imagepath);
  let mime = fileType(image).mime;

  res.writeHead(200, { "Content-Type": mime });
  res.end(image, "binary");
});

Connection.app.use("/", router2);

Connection.app.use((err, req, res, next) => {
  if (err.code == "ENOENT") {
    res.status(404).json({ message: "Image Not Found !" });
  } else {
    res.status(500).json({ message: err.message });
  }
});
