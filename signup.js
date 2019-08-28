const {Connection} = require ('./connection');

const accountSid = 'ACeac647a645f908fe7555222ce674e7b0';
const authToken = '75e7ce63c407e82211af523401a77fb9';
const client = require('twilio')(accountSid, authToken);
const TWILIO_NUMBER=+12074075156;
var generator = require('generate-password');

function sendTwilioMessage (client,from,to,body){
   client.messages
    .create({
       body: "your passowrd is:"+body,
       /*from: '+12074075156',*/
       from:from,
       to:to    
     })
    .then(message => console.log("here the message id:"+message.sid));
}

module.exports= function addUser ( numero_social,nom,prenom,adresse,telephone)
{
  var password = generator.generate({
      length: 10,
      numbers: true
  });
  console.log(password);
  
  sendTwilioMessage(client,TWILIO_NUMBER,telephone,password)
  /*var query = ' INSERT INTO `users` (`numero_social`, `nom`, `prenom`, `adresse`, `telephone`, `password`) VALUES ('+numero_social+','+nom+', '+prenom+','+adresse+', '+telephone+', '+password+')';*/
  var query = " INSERT INTO users (`numero_social`, `nom`, `prenom`, `adresse`, `telephone`, `password`) VALUES ('"+numero_social+"','"+nom+"','"+prenom+"','"+adresse+"','"+telephone+"','"+password+"')";
  Connection.connection.query(query, function(error, results) {
    if (error) throw error;
    console.log(results);
  });
  
}