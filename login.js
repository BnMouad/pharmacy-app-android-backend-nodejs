const {Connection} = require ('./connection');


module.exports= 
{
  login : function  ( telephone,password,callback){
    var query = "SELECT numero_social as user_id,nom,prenom,is_first_auth FROM users where telephone='"+telephone+"' and password='"+password+"' "; 
    Connection.connection.query(query, function(error, results) {
        if (error) throw error;
        if (results.length > 0){
            
            var response = {
                numero_social:results[0].user_id,
                nom:results[0].nom,
                prenom:results[0].prenom,
                adress:results[0].adresse,
                telephone:results[0].telephone,
                is_first_auth:results[0].is_first_auth,
                message: 'logged in ',
                status: 200
            }        
            isLoggedIn=true;
            callback(response)    
        } else {
            var response= {
                message: 'password or user name are wrong',
                status: 401
            };
            callback(response)
        }
    });
   },
}
