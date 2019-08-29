const {Connection} = require ('./connection');

const accountSid = 'ACeac647a645f908fe7555222ce674e7b0';
const authToken = '75e7ce63c407e82211af523401a77fb9';
const client = require('twilio')(accountSid, authToken);
const TWILIO_NUMBER=+12074075156;
var generator = require('generate-password');

//send a message with twilio api
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

//exports functions to use them globally 
module.exports= 
{
  //add user in the database function 
  addUser : function  ( numero_social,nom,prenom,adresse,telephone)
  {
    // generate a random password using generate-password
    var password = generator.generate({
      length: 10,
      numbers: true
    });
    var query = " INSERT INTO users (`numero_social`, `nom`, `prenom`, `adresse`, `telephone`, `password`) VALUES ('"+numero_social+"','"+nom+"','"+prenom+"','"+adresse+"','"+telephone+"','"+password+"')";
    Connection.connection.query(query, function(error, results) {
      if (error) throw error;
      return password;
    });
    sendTwilioMessage(client,TWILIO_NUMBER,telephone,password)
  },

  updatePassword :  function (user_id,password){ 
    // this function is called on the first update of the password , chnages the is_first_auth too 
    var query = " UPDATE `users` SET `password` = '"+password+"' , `is_first_auth` = 0 WHERE `users`.`numero_social` = '"+user_id+"'"
      Connection.connection.query(query, function(error, results) {
        if (error) throw error;
    });
  }

}
