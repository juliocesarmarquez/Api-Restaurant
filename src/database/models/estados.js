const { Sequelize, DataTypes, ValidationError } = require('sequelize');



function estadoModel (connection) {
  const Estado = connection.define('Estados',{
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    
    }
  })
  return Estado;
}

module.exports = {
  estadoModel
  }




