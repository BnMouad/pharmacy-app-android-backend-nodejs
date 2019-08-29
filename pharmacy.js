const {Connection} = require ('./connection');


module.exports= 
{
  getNearByPharmacies : function  ( lat,lng,callback){
    var distance = 10 ; // search far by distance in KM 
    var query = "SELECT *, ((ACOS(SIN(('"+lat+"' * PI()) / 180) * SIN(lat * PI() / 180)+"+ 
                " COS(('"+lat+"'* PI()) / 180) * COS(lat * PI() / 180) * COS(('"+lng+"' - lng)"+
                "* PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344) as distance FROM pharmacies HAVING distance"+
                "<= '"+distance+"' ORDER BY distance ASC";

    Connection.connection.query(query, function(error, results) {
        if (error) throw error;
        callback(results)
    });
   },
}
