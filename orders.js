const { Connection } = require("./connection");

module.exports = {
  getAllOrdersOfUser: function(userId, callback) {
    var query = "select * from commandes where user_id= '" + userId + "'";
    Connection.connection.query(query, function(error, results) {
      if (error) throw error;
      callback(results);
    });
  },
  getOrdersByUser: function(idUser, callback) {
    var query =
      "SELECT commandes.id as id , user_id, pharmacy_id,pharmacies.nom as pharmacy_name, etat,image_path, created_at FROM commandes JOIN pharmacies WHERE commandes.pharmacy_id=pharmacies.id AND user_id= " +
      idUser;

    Connection.connection.query(query, function(error, results) {
      if (error) throw error;
      callback(results);
    });
  },

  creatOrder: function(user_id, pharmacy_id, image_path, callback) {
    var query =
      " INSERT INTO commandes (`user_id`, `pharmacy_id`, `etat`,`image_path`) VALUES ('" +
      user_id +
      "','" +
      pharmacy_id +
      "','en cours','" +
      image_path +
      "')";
    Connection.connection.query(query, function(error, results) {
      if (error) throw error;
      results = {
        status: 200,
        message: "order created succesfuly"
      };
      callback(results);
    });
  }
};
