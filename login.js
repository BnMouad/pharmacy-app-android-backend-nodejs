const {Connection} = require ('./connection');


module.exports= 
{
  login : function  ( telephone,password,callback){
    var query = "SELECT numero_social as user_id FROM users where telephone='"+telephone+"' and password='"+password+"' "; 
    Connection.connection.query(query, function(error, results) {
        if (error) throw error;
        if (results.length > 0){
            var response = {
                user_id:JSON.stringify(results[0].user_id),
                message: 'logged in ',
                status: 401
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
