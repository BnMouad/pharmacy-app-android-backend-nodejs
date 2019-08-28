const accountSid = 'ACeac647a645f908fe7555222ce674e7b0';
const authToken = 'ce2bce18a94bd5214a374b51d7c30fb4';
const client = require('twilio')(accountSid, authToken);

var generator = require('generate-password');
 
var password = generator.generate({
    length: 10,
    numbers: true
});
console.log(password);

client.messages
  .create({
     body: password,
     from: '+12074075156',
     to: '+213777875776'
   })
  .then(message => console.log(message.sid));
  
  function addUser ()