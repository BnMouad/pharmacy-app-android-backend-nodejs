const {Connection} = require ('./connection');


module.exports= 
{
    getAllOrdersOfUser : function (userId,callback){
        var query = "select * from commandes where user_id= '"+userId+"'";
        Connection.connection.query(query,function(error,results){
        if (error) throw error;        
        callback(results);
        });
    },
    creatOrder : function (user_id,phrmacy_id,callback){
        var query = " INSERT INTO commandes (`user_id`, `pharmacy_id`, `etat`) VALUES ('"+user_id+"','"+phrmacy_id+"','en cours')";
        Connection.connection.query(query, function(error, results) {
          if (error) throw error;
          results = {
              status : 200,
              message : "order created succesfuly"
            }
          callback(results)
        });

    }
}
