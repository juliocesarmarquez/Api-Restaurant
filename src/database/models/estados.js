const { DataTypes } = require('sequelize');



function estadoModel (connection) {
  const Estado = connection.define('Estados',{
    nombre: {
      type: DataTypes.STRING
      
    }
  })
  return Estado;
}

module.exports = {
  estadoModel
  }




